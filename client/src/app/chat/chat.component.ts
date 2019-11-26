import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {SocketService} from '../services/socket.service';
import {UserService} from '../services/user.service';
import {ConfigService} from "../services/config.service";
import {User} from '../models/user';
import {Message} from '../models/message';

import {UserDialogComponent} from '../user-dialog/user-dialog.component';

const AVATAR_BOT_URL = "https://i.pinimg.com/originals/0d/2c/e7/0d2ce7de833e651e0bf4191c16e2d693.png";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  user: User;
  oldUser: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  messageForm: FormGroup;
  dialogRef: MatDialogRef<UserDialogComponent> | null;
  isSupportOnline: boolean = false;
  // isTyping: any;

  @ViewChild('chatHistory', { static: false }) chatHistory: ElementRef;

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.messageContent = '';

    this.messageForm = this.formBuilder.group({
      message: '',
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());

    if (!this.user) {
      this.router.navigate(['/login']);
    }
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: any) => {
        if (message.msg.date) {
          message.date = this.getTime(+message.msg.date);
        }

        if (message.type === 'changeName') {
          this.user = message.msg.newUser;
          this.oldUser = message.msg.oldUser;
        }

        if (message.type === 'user' && message.msg.userData.id === 'support') {
          this.isSupportOnline = true
        }
        this.messages.push(message);
      });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onSubmit(messageData): void {
    if (!messageData.message || messageData.message.length === 0) {
      return;
    }
    const message = {
      userId: this.user.id,
      userName: this.user.name,
      msg: messageData.message,
      date: Date.now().toString(),
      userAvatar: this.user.avatarUrl
    };

    this.socketService.sendMessage(message);
    this.messageForm.reset();

    if (this.isSupportOnline) {
      this.configService.getBotMessage()
        .subscribe(botMessage => {
          const supportMessage = {
            userId: 'support',
            userName: 'Support Hero',
            msg: botMessage.message,
            date: Date.now().toString(),
            userAvatar: AVATAR_BOT_URL
          };

          this.socketService.sendMessage(supportMessage);
        },
          error => {
            console.log(error);
        });
    }
  }

  getTime(date) {
    const newDate = new Date(date);
    const hours = (newDate.getHours() < 10 ? '0' : '') + newDate.getHours();
    const minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
    return `${hours}:${minutes}`;
  }

  scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        name: this.user.name
      }
    });
  }

  onKey(event: KeyboardEvent) {
    // console.log(event);
    // this.isTyping = true;
    // setTimeout(() => {
    //   this.isTyping = false;
    // }, 2000);
  }
}
