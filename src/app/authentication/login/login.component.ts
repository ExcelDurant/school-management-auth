import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.emailLogin(email, password);
  }

  googleLogin() {
    this.authService.googleLogin();
  }
  facebookLogin() {
    
  }
}
