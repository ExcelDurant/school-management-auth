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
        // filters the array to return only students which are not members of the class
        this.students = users.filter(data => !this.singleClass.members.includes(data.displayName));
      })
    })
  }

  addStudent(student:User) {
    /* 
    gets the index of the student to be added to a class
    removes the student from the list of students which are not members of the class
    */
    const studentIndex = this.students.indexOf(student)
    this.classService.updateClass(this.singleClass).then((data) => {
      // pushes the student to the members of the class after the database has been updatedd
      this.singleClass.members.push(student.displayName)
      window.alert(student.displayName + " has been succesfully added to "+ this.singleClass.name);
      this.students.splice(studentIndex, 1);
    })
  }

}
