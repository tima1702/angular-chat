import {Component, OnInit} from '@angular/core';

import {User} from '../models/user';

import {SocketService} from '../services/socket.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  ioConnection: any;
  users: User[] = [];
  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: any) => {
        if (message.type === 'user') {
          this.users = message.msg.users;
        }
        if (message.type === 'changeName') {
          this.users.forEach((user, index, array) => {
            if (user.name === message.msg.oldUser.name) {
              array[index].name = message.msg.newUser.name;
            }
          });
        }
        if (message.type === 'leave') {
          this.users = message.msg.users;
        }
      });
  }
}
