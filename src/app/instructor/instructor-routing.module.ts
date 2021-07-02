import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructorComponent } from './instructor.component';

const routes: Routes = [
  {
    path: '', component: InstructorComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo:'home', pathMatch:'full'},
        //   { path: 'dashboard', loadChildren: () => import('./instructor/dashboard/dashboard.module').then(m => m.DashboardModule) },
        //   { path: 'group', loadChildren: () => import('./instructor/group/group.module').then(m => m.GroupModule) },
        //   { path: 'classes', loadChildren: () => import('./instructor/classes/classes.module').then(m => m.ClassesModule) },
        //   { path: 'courses', loadChildren: () => import('./instructor/courses/courses.module').then(m => m.CoursesModule) },
        //   { path: 'files', loadChildren: () => import('./instructor/files/files.module').then(m => m.FilesModule) }
        // ]
      {}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
