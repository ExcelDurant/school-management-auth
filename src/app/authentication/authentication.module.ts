import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatButtonModule } from  '@angular/material/button';
import { MatIconModule } from  '@angular/material/icon';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
