import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { Class } from '../../shared/interfaces/class';
import { User } from '../../shared/interfaces/user';
import { ChatService } from '../../shared/services/chat.service';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SingleMessage } from '../../shared/interfaces/single-message';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  singleClass!: Class;
  user!: User;
  students!: User[];
  currentChatter!: User;
  currentIndex!: number;
  messages!: SingleMessage[];

  chatForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    public classService: ClassService,
    public chatService: ChatService,
    public userService: UsersService,
    public authService: AuthService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getClass();
  }

  getClass() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).then((doc) => {
      this.singleClass = doc.data();
      this.userService.getStudents().subscribe((users) => {
        this.students = users.filter((user) => this.singleClass.members.includes(user.displayName))
      })
    })
  }

  setCurrent(student: User, i: number) {
    this.currentChatter = student;
    this.currentIndex = i;
    this.chatService.getMessages(this.user.displayName, this.currentChatter.displayName).subscribe((messages) => {
      this.messages = messages.sort(function (x, y) {
        let a = x.sentOn,
            b = y.sentOn
        return a == b ? 0 : a > b ? 1 : -1;
    });
    })
  }

  sendMessage() {
    const sender = this.user.displayName;
    const content = this.chatForm.value.content;
    const id = this.afs.createId();
    const receiver = this.currentChatter.displayName;
    const newMessage: SingleMessage = {
      id: id,
      sender: sender,
      receiver: receiver,
      content: content,
      sentOn: new Date().toJSON().slice(0, 10).replace(/-/g, "/") +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
    };
    this.chatService.sendMessage(newMessage);
    this.chatForm = new FormGroup({
      content: new FormControl('')
    });
  }

}


