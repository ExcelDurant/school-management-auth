import { Component, OnInit } from '@angular/core';
import { Class } from '../shared/interfaces/class';
import { ClassService } from '../shared/services/class.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  user!: User;
  classes!: Class[];
  constructor(public classService:ClassService, public authService:AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user);
    this.getClasses();
  }

  getClasses() {
    this.classService.classes.subscribe((classes) => {
      this.classes = classes.filter((classes) => classes.members.includes(this.user.displayName));
    })
  }

}
