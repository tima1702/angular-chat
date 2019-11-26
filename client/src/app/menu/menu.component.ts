import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";
import {SocketService} from "../services/socket.service";

// import {User} from "../models/user";


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
      name: 'Support Hero'
    };

    this.userService.setUser(support);
    this.socketService.joinChat(support);
  }

  onSignOut(): void {
    this.user = this.userService.getUser();
    this.userService.removeUser();
    this.socketService.leaveChat(this.user);
    this.router.navigate(['/login']);
  }

}
