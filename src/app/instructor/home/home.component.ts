import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!:any;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.user = this.authService.user;
    console.log(this.user)
  }


}
