import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    GroupComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
