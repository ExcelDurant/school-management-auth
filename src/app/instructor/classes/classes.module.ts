import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClassDetailsComponent } from './class-details/class-details.component';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class ClassesModule { }
