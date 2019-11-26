import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {User} from '../models/user';

import {SocketService} from '../services/socket.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user: User;
  userForm;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      username: data.name
    });
  }

  ngOnInit() {
  }

  onSubmit(userData): void {
    const oldUser = JSON.parse(this.userService.getUser());
    const newUser = JSON.parse(this.userService.getUser());
    newUser.name = userData.username;
    this.socketService.changeUsername(oldUser, newUser);
    this.userService.setUser(newUser);
  }
}
