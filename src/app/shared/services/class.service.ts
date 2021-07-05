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
    /* 
    function that creates a class
    returns a promise to know when creation is completed
    */
    return this.classesCollection.doc(classe.id).set(classe, { merge: true });
  }

  getClass(id:any) {
    /* 
    gets a class by id 
    converts the result to a promise so as to be acted upon in the class details component
    */
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
    return this.classesCollection.doc(classe.id).set(classe, { merge: true });
  }
}
