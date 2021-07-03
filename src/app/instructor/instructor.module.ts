import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    InstructorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
