import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'class/:id', component:ClassDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
