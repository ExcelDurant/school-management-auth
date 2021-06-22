import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewUsersComponent } from './new-users/new-users.component';

const routes: Routes = [
  { path:'home', component:LandingComponent},
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }, 
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) }, 
  { path: 'instructor', loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule) }, 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path:'newUser', component:NewUsersComponent},
  { path:'', redirectTo: 'home', pathMatch:'full'},
  { path:'**', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
