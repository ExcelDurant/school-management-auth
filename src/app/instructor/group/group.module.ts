import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from 'src/app/shared/services/group-chat.service';


@NgModule({
  declarations: [
    GroupComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ChatService],

  })
export class GroupModule { }
