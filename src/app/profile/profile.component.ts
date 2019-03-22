import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import {Router} from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
    constructor(private userService:UserService,private authenticationService:AuthenticationService) {
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


