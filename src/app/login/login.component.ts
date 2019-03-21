import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	operation: string ='login';
	email: string = null;
	password: string = null;
  nick: string = null;
  private router: Router;

  constructor(private AuthenticationService:AuthenticationService,private userService:UserService,router:Router) {}

  ngOnInit() {
  }

  login(){
  	this.AuthenticationService.loginWithEmail(this.email,this.password).then(
  		(data)=> {
        alert('Loggeado con exito');
        console.log(data);
        this.router.navigate(['home']); 
  		}).catch((Error)=>{
  			alert('ocurrio un error');
  			console.log(Error);
  		});


  }
  register(){
  	this.AuthenticationService.registerWithEmail(this.email,this.password).then(
  		(data)=> {
        const user = {
        uid: data.user.uid ,
        email: this.email ,
        nick: this.nick 
        };
        this.userService.createUser(user).then( (data2)=>{
         alert('registrado con exito');
        console.log(data2);
        }).catch((Error)=>{
        alert('ocurrio un error');
        console.log(Error);
      });
  			
  		}).catch((Error)=>{
  			alert('ocurrio un error');
  			console.log(Error);
  		});
     }

}
