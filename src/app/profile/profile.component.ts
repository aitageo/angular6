import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import {Router} from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';//este modulo no es el de la base de datos de firebase
import { AngularFireStorage } from '@angular/fire/storage';//antes era import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture:any; 
  this:any;
    constructor(private userService:UserService,private authenticationService:AuthenticationService,private firebaseStorage:AngularFireStorage) {
   this.authenticationService.getStatus().subscribe((status)=>{
   	this.userService.getUserById(status.uid).valueChanges().subscribe((data:User)=>{
       this.user = data;
       console.log(this.user);
   },(Error)=>{
   	console.log(Error);
   });
  },(Error)=>{
  	console.log(Error);
  });
}

ngOnInit() {
  }
  saveSettings(){
  	  if (this.croppedImage){
          const currentPictureId = Date.now();
          const pictures = this.firebaseStorage.ref('picture/' + currentPictureId + '.jpg').putString(this.croppedImage,'data_url');//se resuelve la promesa del ref 
           pictures.then((result)=>{
           	this.picture = this.firebaseStorage.ref('picture/' + currentPictureId + '.jpg').getDownloadURL();
           	this.picture.subscribe((p,)=>{
           		this.userService.setAvatar(p,this.user.uid).then(()=>{
           			alert('avatar subido');
           		}).catch((Error)=>{
                   alert('error al subir el avatar');
                   console.log('error');
                });
           		
           	});
           }).catch((Error)=>{
           	console.log(Error);
           });
         }else {}
  	this.userService.editUser(this.user).then(()=>{
  		alert('cambios guradados');
  	}).catch((Error)=>{
         alert('cambios no guardados');
         console.log(Error);
  	});
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    // show cropper
}
loadImageFailed() {
    // show message
}
}


