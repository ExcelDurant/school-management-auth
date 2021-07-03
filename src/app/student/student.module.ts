import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ClassDetailsComponent } from './class-details/class-details.component';


@NgModule({
  declarations: [
    StudentComponent,
    ClassDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
