import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private group:GroupService) { }

  ngOnInit(): void {
  }

}