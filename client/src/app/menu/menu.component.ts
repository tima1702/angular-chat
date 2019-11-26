import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";
import {SocketService} from "../services/socket.service";

const AVATAR_BOT_URL = "https://i.pinimg.com/originals/0d/2c/e7/0d2ce7de833e651e0bf4191c16e2d693.png";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: string;
  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSupportClick(): void {
    const support = {
      id: `support`,
      name: 'Support Hero',
      avatarUrl: AVATAR_BOT_URL
    };

    this.socketService.joinChat(support);
  }

  onSignOut(): void {
    this.user = this.userService.getUser();
    this.userService.removeUser();
    this.socketService.leaveChat(this.user);
    this.router.navigate(['/login']);
  }

}
