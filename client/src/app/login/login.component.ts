import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';

import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

const AVATAR_URL = 'https://avatars.dicebear.com/v2/male/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm;

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ''
    });
  }

  onSubmit(userData): void {
    const loggedTime = Date.now();

    const user = {
      id: `user_${loggedTime}`,
      name: userData.username,
      avatarUrl: `${AVATAR_URL}${this.getRandomSeed()}.svg`
    };

    this.userService.setUser(user);
    this.socketService.joinChat(user);
    this.router.navigate(['/chat']);
  }

  ngOnInit() {
  }

  private getRandomSeed(): number {
    return Math.random() * 1000;
  }
}
