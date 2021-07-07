import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import firebase from 'firebase/app';
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
  messageLoader: boolean = false;

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
    // equates current user to logged in user
    this.user = this.authService.user;
    // invokes function to get the class
    this.getClass();
  }

  getClass() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).then((doc) => {
      this.singleClass = doc.data();
      // gets all students from the service
      this.userService.getStudents().subscribe((users) => {
        // filters the students that are members of the class
        this.students = users.filter((user) => this.singleClass.members.includes(user.displayName))
      })
    })
  }

  getMessages() {
    console.log('timeout')
    this.chatService.messages.subscribe((messages) => {
      console.log(messages)
      this.messages = messages
    })
  }

  setCurrent(student: User, i: number) {
    // sets the currently active student
    // current student who will be the recipient of the messages
    this.currentChatter = student;
    // equates an index which is used for styling of the student
    this.currentIndex = i;
    console.log(this.currentChatter)
    this.messages = []
    this.messageLoader = true

    this.chatService.checkRoomSender(this.user.uid, this.currentChatter.uid).subscribe((messages) => {
      const m1 = messages
      this.chatService.checkRoomReceiver(this.user.uid, this.currentChatter.uid).subscribe((messages) => {
        const m2 = messages
        const finalResults = [...m1, ...m2]
        this.messageLoader = false
        this.messages = finalResults
          .map((message) => {
            message = {
              ...message, sentOn: message.sentOn.slice(0, 10).replace(/-/g, "/") +
                " " +
                new Date(message.sentOn).getHours() +
                ":" +
                new Date(message.sentOn).getMinutes() +
                ":" +
                new Date(message.sentOn).getSeconds()
            }
            return message
          })
        .sort(function (x, y) {
                let a = x.sentOn,
                  b = y.sentOn
                return a == b ? 0 : a > b ? 1 : -1;
              })
      })
    })

    // gets messages with recipient as current student and sender as currently logged in user
    // this.chatService.getSenderMessages(this.user.displayName, this.currentChatter.displayName).subscribe((messages) => {
    //   const m1 = messages;
    //   this.chatService.getReceiverMessages(this.user.displayName, this.currentChatter.displayName).subscribe((messages) => {
    //     const m2 = messages;
    //     const finalResults = [...m1, ...m2]
    //     console.log(finalResults)
    //     this.messages = finalResults.sort(function (x, y) {
    //       let a = x.sentOn,
    //         b = y.sentOn
    //       return a == b ? 0 : a > b ? 1 : -1;
    //     })
    //   });
    // })
  }

  sendAMessage() {
    const sender = this.user.displayName;
    const content = this.chatForm.value.content;
    const id = this.afs.createId();
    const receiver = this.currentChatter.displayName;
    const newMessage: SingleMessage = {
      id: id,
      sender: sender,
      receiver: receiver,
      content: content,
      sentOn: firebase.firestore.Timestamp.now().toDate().toJSON()
      // .toJSON().slice(0, 10).replace(/-/g, "/") +    // new Date().toJSON().slice(0, 10).replace(/-/g, "/") +
      //   " " +
      //   firebase.firestore.Timestamp.now().toDate().getHours() +
      //   ":" +
      //   firebase.firestore.Timestamp.now().toDate().getMinutes() +
      //   ":" +
      //   firebase.firestore.Timestamp.now().toDate().getSeconds()
    };
    this.chatService.sendAMessage(newMessage);
    this.chatForm = new FormGroup({
      content: new FormControl('')
    });
  }

}


