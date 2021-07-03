import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/shared/interfaces/class';
import { ClassService } from 'src/app/shared/services/class.service';
import { User } from '../../../shared/interfaces/user';
import { UsersService } from '../../../shared/services/users.service';
import { map, filter, tap } from 'rxjs/operators'

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {


  singleClass!: Class;
  students!: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    public classService:ClassService,
    public usersService:UsersService
  ) { }

  ngOnInit(): void {
    this.getClass();
  }

  getClass() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).then((doc) => {
      this.singleClass = doc.data();
      this.usersService.getStudents().subscribe((users) => {
        this.students = users.filter(data => !this.singleClass.members.includes(data.displayName));
          // this.students = users;
          // console.log(this.students)
      })
    })
  }

  addStudent(student:User) {
    const studentIndex = this.students.indexOf(student)
    this.singleClass.members.push(student.displayName)
    this.classService.updateClass(this.singleClass).then((data) => {
      window.alert(student.displayName + " has been succesfully added to "+ this.singleClass.name);
      this.students.splice(studentIndex, 1);
    })
  }

}
