import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './group.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{ path: '', component: GroupComponent },
{path:'chat', component:ChatComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
