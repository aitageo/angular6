import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';

   constructor(private router:Router){}
}
