 /* This service is the one that defines all the
 functions about Firebase. Login, logout, fetch
 data, etc. */
 
 import { Injectable } from '@angular/core';
//Firebase Import
import {database, initializeApp, auth} from 'firebase';

 @Injectable()
 export class FirebaseService{
     public db;
     public auth;
     public signedIn: boolean = false;
     public redirectURL: string;
     public modules;
     public initialize(config){
         initializeApp(config);
         this.db = database();
         this.auth = auth();
         this.db.ref('modules').on('value', (snap) => this.modules = snap.val());
     }

     public authenticate(email: string, password: string): Promise<any>{
         return this.auth.signInWithEmailAndPassword(email, password)
             .catch(function (error){
                 this.signedIn = false;
                 this.db.goOffline();
            })
            .then(() => this.signedIn = true);
     }

     public logout(): Promise<any>{
         return this.auth.signOut().then(() => this.signedIn = false)
         .catch(error => console.log(error));
     }
 }