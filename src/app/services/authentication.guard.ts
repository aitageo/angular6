import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";
import { map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
	constructor(private  AuthenticationService:AuthenticationService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.AuthenticationService.getStatus().pipe(
    	map(status =>{
    		if(status){
            return true;
    		}else{
          this.router.navigate(['/login']);
    			return true;
    		}
    	}) 
    );
  }
}
