import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { Class } from '../../shared/interfaces/class';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  user!: User;
  classes!: Class[];
  constructor(public classService:ClassService, private afs: AngularFirestore, private authService:AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user
    this.getClasses();
  }

  createClass() {
    const newClass:Class = {
      id:this.afs.createId(),
      name:this.classForm.value.name,
      description:this.classForm.value.description,
      members:[],
      createdBy:this.user.displayName,
      createdOn:new Date()
    }
    this.classService.createClass(newClass)
    .then(() =>{
      window.alert("your new class has been successfully created")
      this.classForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl('')
      });
    })
    .catch((error) => {
      window.alert("an error occured" + error.message);
    })
    
  }

  getClasses() {
    this.classService.classes.subscribe((classes) => {
      this.classes = classes;
      console.log(classes);
    })
  }

}
