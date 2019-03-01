import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
friendId:any;
friends : User[];
friend: User;

  constructor(private activatedRoute : ActivatedRoute ) { 
  this.friendId = this.activatedRoute.snapshot.params['uid'];
  console.log(this.friendId);
   let usuario1: User = {
      nick: 'Eduardo',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friend: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Marcos',
      age: 30,
      email:'marcos@aoe.aoe',
      friend: false,
      uid: 5
    };
    this.friends = [usuario1,usuario2,usuario3,usuario4,usuario5];
    this.friend = this.friends.find((record) => {
    return record.uid == this.friendId;	
    });
    Console.log(this.friend);
    
}
  ngOnInit() {
  }

}
