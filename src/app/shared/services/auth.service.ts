import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User;
  logged: boolean | undefined;
  isStudent: boolean = false;
  isInstructor: boolean = false;
  isAdmin: boolean = false;
  notVerified: boolean = false;
  private usersCollection: AngularFirestoreCollection<any>;


  constructor(public auth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.usersCollection = afs.collection<any>('users');
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.getUser(user).toPromise().then((doc) => {
          this.user = doc.data();
          this.logged = true;
          // run fuction to determine access rights
          this.getUserAccess();
        })
        // ...       
        // saves the login status to the local storage
        sessionStorage.setItem('userA', JSON.stringify(this.user));
      } else {
        // User is signed out
        // ...
        this.logged = false;
        // this.user = undefined;
        sessionStorage.setItem('userA', JSON.stringify(this.user));
      }
    });
  }

  // gets the user information from the component and uses it to sign the user up
  emailSignup(firstName: string, lastName: string, phoneNumber: string, email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 

        // passes user info to the function which has to store the user information to the firestore database
        this.setUserData(firstName, lastName, phoneNumber, userCredential.user);

        this.logged = true;
        // ...
        // navigates to new users page where he will await verification
        this.router.navigate(['newUser']);
        // run fuction to determine access rights
        this.getUserAccess();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("something went wrong when signing up")
        // ..
      });
  }

  // function to login users with email and password
  emailLogin(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // get user from firestore
        // converts function returned from getUser to a promise so it can await response before proceeding to the next steps
        this.getUser(userCredential.user).toPromise().then((doc) => {
          this.user = doc.data();
          this.redirectUser();
          this.logged = true;
          // run fuction to determine access rights
          this.getUserAccess();
        })
        // ...

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("something went wrong when loging in")
      });
  }

  // google signup fuction
  googleSignup() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // passes user info to the function which has to store the user information to the firestore database
        this.setUserData("", "", "", result.user);
        // ...
        this.logged = true;
        // ...
        // navigates to new users page where he will await verification
        this.router.navigate(['newUser']);
        // run fuction to determine access rights
        this.getUserAccess();
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
  }

  // google login function
  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // passes user info to the function which has to store the user information to the firestore database
        this.getUser(result.user).toPromise().then((doc) => {
          this.user = doc.data();
          this.logged = true;
        // ...
        // run fuction to determine access rights
        this.getUserAccess();
        // redirect user based on access rights
        this.redirectUser();
        })
        // ...
        
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
  }

  // logs out the user
  logout() {
    this.auth.signOut();
  }

  // sends the user information to firebase
  setUserData(firstName: string, lastName: string, phoneNumber: string, user: any) {
    // creates a variable that will hold user information before sending it to firestore
    const userData: User = {
      // gets the user id from the credential id generated by firebase
      uid: user.uid,
      email: user.email || null,
      firstName: firstName,
      lastName: lastName,
      // in case sign up with google displayname is simply displayname but is first name and last name if signup with email
      displayName: user.displayName || firstName + " " + lastName,
      phoneNumber: user.phoneNumber || phoneNumber,
      photoURL: user.photoURL || null,
      role: {
        student: false,
        instructor: false,
        admin: false
      }
    }
    this.user = userData;
    // adds the user info to firestore storing into a document with reference as user id
    this.usersCollection.doc(userData.uid).set(userData);
  }

  // function to get a certain user's info from firestore 
  // function takes in user object from login
  getUser(user: any) {
    // searches firestore for user id and returns a function which is to be converted to a promise
    const userRef = this.usersCollection.doc(user.uid);
    return userRef.get()
  }

  // function to determine access rights of the new user
  getUserAccess() {
    if (this.user.role.student) {
      this.isStudent = true;
    } else if (this.user.role.instructor) {
      this.isInstructor = true;
    } else if (this.user.role.admin) {
      this.isAdmin = true;
    } else {
      console.log("not yet verified");
      this.notVerified = true;
    }
  }

  // function to take user to route corresponding to access authorization
  redirectUser() {
    if (this.user.role.admin) {
      this.router.navigate(['admin'])
    } else if (this.user.role.student) {
      this.router.navigate(['student'])
    } else {
      this.router.navigate(['newUser'])
    }
  }
}
