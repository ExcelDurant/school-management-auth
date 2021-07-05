import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SingleMessage } from '../interfaces/single-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages!: Observable<SingleMessage[]>;
  private messagesCollection: AngularFirestoreCollection<any>;

  constructor(private afs:AngularFirestore) {
    this.messagesCollection = afs.collection<SingleMessage>('messages');
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
}
