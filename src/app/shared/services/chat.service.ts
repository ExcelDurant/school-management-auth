import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SingleMessage } from '../interfaces/single-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private messagesCollection: AngularFirestoreCollection<any>;

  constructor(private afs:AngularFirestore) {
    this.messagesCollection = afs.collection<SingleMessage>('messages');
   }

   getMessages(sender:string, receiver:string) {
     return this.afs.collection<SingleMessage>('messages', ref => ref.where('sender', '==', sender||receiver).where('receiver', '==', receiver||sender)).valueChanges()
   }

   sendMessage(message:SingleMessage) {
     this.messagesCollection.doc(message.id).set(message);
   }
}
