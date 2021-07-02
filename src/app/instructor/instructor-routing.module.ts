import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './files/files.component';
// import { HomeComponent } from './home/home.component';

import { InstructorComponent } from './instructor.component';

const routes: Routes = [
  {
    path: '', component: InstructorComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      // { path: 'dashboard', component: DashboardComponent },
      // { path: 'courses', component:CoursesComponent },
      { path: 'classes', component: ClassesComponent },
      // { path: 'files', component: FilesComponent },

        //   { path: 'dashboard', loadChildren: () => import('./instructor/dashboard/dashboard.module').then(m => m.DashboardModule) },
        //   { path: 'group', loadChildren: () => import('./instructor/group/group.module').then(m => m.GroupModule) },
        //   { path: 'classes', loadChildren: () => import('./instructor/classes/classes.module').then(m => m.ClassesModule) },
        //   { path: 'courses', loadChildren: () => import('./instructor/courses/courses.module').then(m => m.CoursesModule) },
        //   { path: 'files', loadChildren: () => import('./instructor/files/files.module').then(m => m.FilesModule) }
        // ]

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
