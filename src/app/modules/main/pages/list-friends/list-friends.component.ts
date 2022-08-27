import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//services 
import { UserService } from '../../services/user.service';
import { MyFriendsService } from'../../services/myFriends.service';
import { ConversationService } from '../../services/conversations.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css']
})

export class ListFriendsComponent implements OnInit {

  @ViewChild('inputSearch') inputSearch!: ElementRef;
  listFriends: any[] = [];
  isFriends = true;

  // For Component Popup-image
  canShowPopUpImage = false;
  urlImageSendPopUpImage = "";

  // For Component profile-friend
  canShowPopUpProfileFriend = false;
  idFriendSendPopUpProfile = "";

  constructor(
    private userService: UserService,
    private myFriendsService: MyFriendsService,
    private conversationService: ConversationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getFriendsId();
  }
  
  getFriendsId(){
    this.listFriends = [];
    const idUser = this.userService.user.idUser;
    this.myFriendsService.getAllMyFriends(idUser).subscribe( (arrayIdFriends: string[]) => this.getFriendsData(arrayIdFriends) );
    if(!this.isFriends)this.cleanInputSearch();
  }

  getFriendsData(arrayIdFriends: string[]): void{
    this.myFriendsService.getArrayFriendsByIdFriend(arrayIdFriends).subscribe({
      next: (result: any) => this.listFriends.push(result)
    });
  }

  searchMyFriend(word: any){
    this.userService.searchByUserName(word).subscribe({
      next: (result: any[]) => {
        this.isFriends = false;
        this.listFriends = result;
      }
    });
  }

  cleanInputSearch(){
    this.inputSearch.nativeElement.value = '';
    this.isFriends = true;
  }

  addNewFriend(idFriend: string){
    this.myFriendsService.addNewFriend(this.userService.user.idUser, idFriend).subscribe({
      next: () => { 
        this.alertService.alertaSuccess('You Have a new Friend!');
        this.getFriendsId();
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
    this.conversationService.createConversation(this.userService.user.idUser, idUserTwo).subscribe();
  }

  showPopUpImage(urlImage = this.urlImageSendPopUpImage){
    this.urlImageSendPopUpImage = urlImage;
    this.canShowPopUpImage = !this.canShowPopUpImage;
  }

  showProfileFriend(idUserFriend = this.idFriendSendPopUpProfile){
    this.idFriendSendPopUpProfile = idUserFriend;
    this.canShowPopUpProfileFriend = !this.canShowPopUpProfileFriend;
  }

}
