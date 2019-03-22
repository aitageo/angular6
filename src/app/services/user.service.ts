import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFiredatabase:AngularFireDatabase) {}
   getUsers(){
     return this.angularFiredatabase.list('/users');

   }
   getUserById(uid){
     return this.angularFiredatabase.object('/users/' + uid);
   }
   createUser(user){
    return this.angularFiredatabase.object('/users/' + user.uid).set(user);
   }
   editUser(user){
    return this.angularFiredatabase.object('/users/' + user.uid).set(user);
   }
   setAvatar(avatar,uid){
     return this.angularFiredatabase.object('users/' + uid + '/avatar').set(avatar);
   }
}
