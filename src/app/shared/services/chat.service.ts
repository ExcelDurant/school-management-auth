import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { SingleMessage } from '../interfaces/single-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageArray!:SingleMessage[]
  messages!: Observable<SingleMessage[]>;
  // public messageSubject = new Subject<Observable<SingleMessage[]>>();
  private messagesCollection: AngularFirestoreCollection<any>;
  private chatRoomCollection: AngularFirestoreCollection<any>;
  messageCollection!: AngularFirestoreCollection<SingleMessage>;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = afs.collection<SingleMessage>('messages');
    this.chatRoomCollection = afs.collection('chatRooms');
  }


  getSenderMessages(sender: string, receiver: string) {
    return this.afs.collection<SingleMessage>('messages', ref => ref.where('sender', '==', sender).where('receiver', '==', receiver)).valueChanges(['added'])
  }

  getReceiverMessages(sender: string, receiver: string) {
    return this.afs.collection<SingleMessage>('messages', ref => ref.where('sender', '==', receiver).where('receiver', '==', sender)).valueChanges(['added'])
  }

  sendMessage(message: SingleMessage) {
    this.messagesCollection.doc(message.id).set(message);
  }

  //  checkRoomSender(sender:string) {
  //    return this.afs.collection('chatRoom', ref => ref.where('members', 'array-contains', sender)).doc().collection('messages').valueChanges(['added'])
  //  }

  //  checkRoomReceiver(receiver:string) {
  //   return this.afs.collection('chatRoom', ref => ref.where('members', 'array-contains', receiver)).doc().collection('messages').valueChanges(['added'])
  //  }

  // myPromise = new Promise(function(resolve, reject) {
    
  // })

  // checkRoomSender(senderId: string, receiverId: string) {
  //   return new Promise((resolve, reject) =>{
  //     let roomRef = this.chatRoomCollection.doc(senderId + receiverId)
  //     roomRef.get().toPromise().then((doc) => {
  //       if(doc.exists) {
  //         this.messageCollection = roomRef.collection<SingleMessage>('messages')
  //       }
  //     })
  //   })
    
  // }

  checkRoomSender(senderId: string, receiverId: string) {
    let roomRef = this.chatRoomCollection.doc(senderId + receiverId)
    this.messageCollection = roomRef.collection<SingleMessage>('messages', ref => ref.orderBy('sentOn'))
    return this.messageCollection.valueChanges(['added'])
  }

  checkRoomReceiver(senderId: string, receiverId: string) {
    let roomRef = this.chatRoomCollection.doc(receiverId + senderId)
    this.messageCollection = roomRef.collection<SingleMessage>('messages', ref => ref.orderBy('sentOn'))
    return this.messageCollection.valueChanges(['added'])
  }

  // checkRoomReceiver(senderId: string, receiverId: string) {
  //   const roomRef = this.chatRoomCollection.doc(receiverId + senderId)
  //   roomRef.get().toPromise().then((doc) => {
  //     console.log("arrived second check")
  //     this.getMessages(roomRef)
  //     // if (doc.exists) {
  //     //   console.log("arrived second check")
  //     //   this.getMessages(roomRef)
  //     // } else {
  //     //   // this.createRoomDoc(senderId, receiverId)
  //     //   this.getMessages(roomRef)
  //     // }
  //   })
  // }

  // createRoomDoc(senderId: string, receiverId: string) {
  //   const roomRef = this.chatRoomCollection.doc(receiverId + senderId)
  //   roomRef.collection('messages').add({})
  //     .then(() => {
  //       this.messageCollection = roomRef.collection<SingleMessage>('messages')
  //       this.messages = this.messageCollection.valueChanges(['added'])
  //     })
  // }

  getMessages(ref: AngularFirestoreDocument) {
    this.messageCollection = ref.collection<SingleMessage>('messages')
    console.log('arrived third check')
    this.messages = this.messageCollection.valueChanges(['added'])
    // this.messageSubject.next(this.messages)
    // return this.messageCollection.valueChanges(['added']).toPromise()
  }

  sendAMessage(message: SingleMessage) {
    this.messageCollection.doc(message.id).set(message).then(() => {
    })
  }
}
