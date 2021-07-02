import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Class } from '../interfaces/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  classes: Observable<Class[]>;
  private classesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.classesCollection = afs.collection<Class>('classes');
    this.classes = this.classesCollection.valueChanges();
  }

  createClass(classe:Class) {
    return this.classesCollection.doc(classe.id).set(classe, { merge: true });
  }

  getClass(id:any) {
    const classRef = this.classesCollection.doc(id);
    return classRef.get().toPromise();
  }

  deleteClass(classe:Class) {
    const classRef = this.classesCollection.doc(classe.id);
    classRef.delete().then(() =>{
      window.alert("the class has been successfully deleted")
    })
  }

  updateClass(classe:Class) {
    this.classesCollection.doc(classe.id).set(classe, { merge: true });
  }
}
