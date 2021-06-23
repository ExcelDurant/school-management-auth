import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl('')
  });

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    const firstName = this.signupForm.value.firstName;
    const lastName = this.signupForm.value.lastName;
    const email = this.signupForm.value.email;
    const phoneNumber = this.signupForm.value.phoneNumber;
    const password = this.signupForm.value.password;
    const repassword = this.signupForm.value.repassword;
    if(password == repassword) {
      this.authService.emailSignup(firstName, lastName, phoneNumber, email, password);
    } else {
      window.alert("passwords don't match");
    }
  }

  googleSignup() {
    this.authService.googleSignup();
  }

  facebookSignup() {

  }
}
