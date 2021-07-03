import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  users: Observable<User[]>;
  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  getStudents() {
    return this.afs.collection<User>('users', ref => ref.where('role.student', '==', true)).valueChanges()
  }
}
