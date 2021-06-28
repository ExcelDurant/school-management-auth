import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { StudentGuard } from './shared/guards/student.guard';
import { InstructorGuard } from './shared/guards/instructor.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'auth', 
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
 },
  { path: 'student', 
  loadChildren: () => import('./student/student.module').then(m => m.StudentModule), 
  canActivate: [StudentGuard] 
},
  { path: 'instructor', 
  loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule), 
  canActivate: [InstructorGuard] 
},
  { path: 'admin', 
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
  canActivate: [AdminGuard] 
},
  { path: 'newUser', component: NewUsersComponent, 
  canActivate: [AuthGuard] 
},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
