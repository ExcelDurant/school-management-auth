import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChatService } from 'src/app/shared/services/group-chat.service';
// import { ChatComponent } from './chat.component';
import { GroupComponent } from '../group.component';
import { GroupRoutingModule } from '../group-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GroupComponent,
    // ChatComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  // providers: [ChatService],

  })
export class GroupModule { }
