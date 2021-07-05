import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SingleMessage } from '../interfaces/single-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages!: Observable<SingleMessage[]>;
  private messagesCollection: AngularFirestoreCollection<any>;
  private chatRoomCollection: AngularFirestoreCollection<any>;
  messageCollection!: AngularFirestoreCollection<SingleMessage>;

  constructor(private afs:AngularFirestore) {
    this.messagesCollection = afs.collection<SingleMessage>('messages');
    this.chatRoomCollection = afs.collection('chatRoom');
   }

   getSenderMessages(sender:string, receiver:string) {
      return this.afs.collection<SingleMessage>('messages', ref => ref.where('sender', '==', sender).where('receiver', '==', receiver)).valueChanges(['added'])
   }

   getReceiverMessages(sender:string, receiver:string) {
     return this.afs.collection<SingleMessage>('messages', ref => ref.where('sender', '==', receiver).where('receiver', '==', sender)).valueChanges(['added'])
   }

   sendMessage(message:SingleMessage) {
     this.messagesCollection.doc(message.id).set(message);
   }

  //  checkRoomSender(sender:string) {
  //    return this.afs.collection('chatRoom', ref => ref.where('members', 'array-contains', sender)).doc().collection('messages').valueChanges(['added'])
  //  }

  //  checkRoomReceiver(receiver:string) {
  //   return this.afs.collection('chatRoom', ref => ref.where('members', 'array-contains', receiver)).doc().collection('messages').valueChanges(['added'])
  //  }


   checkRoomSender(senderId:string, receiverId:string) {
     const roomRef = this.chatRoomCollection.doc(senderId+receiverId)
     roomRef.get().toPromise().then((doc) => {
       if(doc.exists) {
         this.getMessages(roomRef)
       } else {
        this.checkRoomReceiver(senderId, receiverId)
       }
     })
   }

   checkRoomReceiver(senderId:string, receiverId:string) {
    const roomRef = this.chatRoomCollection.doc(receiverId+senderId)
    roomRef.get().toPromise().then((doc) => {
      if(doc.exists) {
        this.getMessages(roomRef)
      } else {

      }
    })
   }

   getMessages(ref:AngularFirestoreDocument) {
    this.messageCollection = ref.collection<SingleMessage>('messages')
    this.messages = this.messageCollection.valueChanges(['added'])
   }
}
