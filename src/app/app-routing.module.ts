import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { StudentGuard } from './shared/guards/student.guard';
import { InstructorGuard } from './shared/guards/instructor.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { InstructorComponent } from './instructor/instructor.component';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [StudentGuard]
  },
  {
     path: 'instructor',
     component: InstructorComponent,
     children: [
      { path: 'dashboard', loadChildren: () => import('./instructor/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'group', loadChildren: () => import('./instructor/group/group.module').then(m => m.GroupModule) },
      { path: 'classes', loadChildren: () => import('./instructor/classes/classes.module').then(m => m.ClassesModule) },
      { path: 'courses', loadChildren: () => import('./instructor/courses/courses.module').then(m => m.CoursesModule) },
      { path: 'files', loadChildren: () => import('./instructor/files/files.module').then(m => m.FilesModule) }
    ],
  //   loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule), 
     canActivate: [InstructorGuard] 
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'newUser', component: NewUsersComponent,
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
