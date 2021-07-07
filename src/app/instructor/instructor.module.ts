import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { MatIconModule } from '@angular/material/icon';
// import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InstructorComponent,
    // HomeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    InstructorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstructorModule { }
