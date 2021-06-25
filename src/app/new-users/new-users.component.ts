import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {

  user:User | undefined;

  constructor(public authService:AuthService ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.user = this.authService.user;
    console.log(this.user);
  }

}
