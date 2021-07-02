import { Component, OnInit } from '@angular/core';
import { Class } from '../shared/interfaces/class';
import { ClassService } from '../shared/services/class.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {


  classes!: Class[];
  constructor(public classService:ClassService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.classService.classes.subscribe((classes) => {
      this.classes = classes;
      console.log(classes);
    })
  }

}
