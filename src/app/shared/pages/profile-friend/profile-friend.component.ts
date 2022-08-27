import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from 'src/app/core/models/User';

// services
import { MyFriendsService } from '../../../modules/main/services/myFriends.service';
import { UserService } from '../../../modules/main/services/user.service';
import { ConversationService } from '../../../modules/main/services/conversations.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.css']
})
export class ProfileFriendComponent implements OnInit, AfterViewInit {
  
  @Input() isFriend = true;
  @Input() idFriend!: string; 
  @Input() canShowButtonSendMessage = true;


  @Output() closePopUp: EventEmitter<null> = new EventEmitter();
  @Output() removeOneFriendFromList: EventEmitter<null> = new EventEmitter();

  user: User = new User("",false,new Date,"","","","","","","","","","","");
  canShowPopUpImageFriend = false;  

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private myFriendsService: MyFriendsService,
    private router: Router,
    private conversationService: ConversationService
  ) {}

  ngAfterViewInit(): void {
    this.grayBackgroundImage();
  }

  ngOnInit(): void {
    this.getUserById(this.idFriend);
  }

  getUserById(idUserFriend:string){
    this.userService.getByIdUser(idUserFriend).subscribe({
      next: (result) => {
        (result) ?
          (this.assignDataUser(result)) :
          (this.closePopUpProfile(), this.alertService.alertaWarning('Can not see profile!'));
      },
      complete: () => this.addClassShow(),
      error: () => {
        this.alertService.alertaWarning('Can not see profile!');
        this.closePopUpProfile();
      }
    });
  }
  
  addClassShow(){
    const popUpElement: any = document.querySelector('.content-profileFriend');
    popUpElement.classList.toggle('show');
  }

  showPopUpImage(){
    this.canShowPopUpImageFriend = !this.canShowPopUpImageFriend;
  }
  
  sendMessage(){
    if(this.isFriend){
      this.conversationService.getConversationByIdUserOneIdUserTwo(this.userService.user.idUser, this.user.idUser)
      .subscribe( (result: any[]) => {
        const idConversation = result[0].idConversation;
        this.router.navigate(['/chat/conversation', this.user.idUser, idConversation]);
      });
    }else{
      this.addNewFriend(this.idFriend);
    }
  }

  addNewFriend(idFriend: string){
    this.myFriendsService.addNewFriend(this.userService.user.idUser, idFriend).subscribe({
      next: () => { 
        this.alertService.alertaSuccess('You Have a new Friend!');
        this.conversationService.getConversationByIdUserOneIdUserTwo(this.userService.user.idUser, idFriend).subscribe( 
          (exist: []) => {
            if(exist.length === 0) this.createConversation(idFriend);
          }
        );
      },
      error: (err) => {
        this.alertService.alertaWarning(`${err.error.message}!`);
      }
    });
  }

  createConversation(idUserTwo: string){
    this.conversationService.createConversation(this.userService.user.idUser, idUserTwo).subscribe({
      next: () => { 
        this.conversationService.getConversationByIdUserOneIdUserTwo(this.userService.user.idUser, idUserTwo)
        .subscribe( (result: any[]) => {
          const idConversation = result[0].idConversation;
          this.router.navigate(['/chat/conversation', idUserTwo, idConversation]);
        });
      },
      error: () => this.alertService.alertaWarning('There was a problem accessing the Conversation')
    });
  }

  closePopUpProfile(){
    const popUpElement: any = document.querySelector('.content-profileFriend');
    popUpElement.classList.toggle('show');
    setTimeout(() => {
      this.closePopUp.emit();
    }, 500);
  }

  assignDataUser(data: any){
    const newUser = new User(
      data.aboutMe,
      data.active,
      data.createDate,
      data.email,
      data.fullName,
      data.idImage,
      data.idUser,
      data.password,
      data.role,
      data.status,
      data.urlImage,
      data.userName,
      data.idWallpaper,
      data.urlWallpaper
    );
    this.user = newUser;
  }

  grayBackgroundImage(){
    const buttonsElements = document.querySelectorAll('button');
    const elementHTML = document.querySelector('#background-image');
    buttonsElements.forEach( (element: any) => {
      element.addEventListener('mouseover', () => elementHTML?.classList.toggle('gray'));
      element.addEventListener('mouseout',() => elementHTML?.classList.toggle('gray'));
    });
  }

  removeFriend(idUserFriend: string){

    this.alertService.alertaQuestionDelete('It will be removed from your friends list')
    .then((result: any) => {
      //result.isConfirmed == true && this.alertaService.alertaExito(alertTextExito); // Esto es short conditional
      if(result.isConfirmed){
        this.myFriendsService.removeFriend(this.userService.user.idUser, idUserFriend)
        .subscribe({
          next: () => { 
            this.alertService.alertaSuccess('Deleted Sucessfully');
            this.removeOneFriendFromList.emit();
            this.closePopUpProfile();
            this.router.navigateByUrl('chat/friends');  
          },
          error: () => { this.alertService.alertaWarning('Cannot Be Removed'); }
        });
      }

    });
  }

}