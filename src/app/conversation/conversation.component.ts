import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from "../services/user.service";
import { ConversationService } from "../services/conversation.service";
import { AuthenticationService } from "../services/authentication.service";
import { AngularFireAuthModule } from '@angular/fire/auth';




@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
friendId:any;
friend: User;
today: any = Date.now();
user:User;
textMessage:string;
conversation_id:string;
ids:any;
uid:any;

  constructor(private activatedRoute : ActivatedRoute,
            private userService: UserService,
            private conversationService:ConversationService,private AuthenticationService:AuthenticationService) { 
  this.friendId = this.activatedRoute.snapshot.params['uid'];
  console.log(this.friendId);
  
          this.AuthenticationService.getStatus().subscribe((session)=>{
          this.userService.getUserById(session.uid).valueChanges().subscribe((user:User)=>{
          this.user = user;
          this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          this.uid = data;
          const ids = [this.user.uid, this.friend.uid].sort();//ordena el arreglo para obtener los ids en el mismo orden del arreglo
           this.conversation_id = ids.join('|');    
    }, (error) => {
      console.log(error);
    });
         });
      });
    
}



  ngOnInit() {
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id ,
      timestamp :  Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then(()=>{
       this.textMessage = '';
       
    });
  }

}
