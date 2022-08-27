import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

// models
import { User } from '../../../../core/models/User';

// services
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { SocketClientService } from '../../../../shared/services/socket-client.service';

// interfaces
import { CustomMessageInterface  } from '../../interfaces/CustomMessageInterface';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent{

  @ViewChild('inputSendMessage') inputSendMessage!: ElementRef;

  arrayMessages: CustomMessageInterface[] = [];
  friend!: User;
  user!: User;
  idConversation!: string;
  dateNow = new Date().toLocaleDateString();

  // For Component Popup-image
  canShowPopUpImage = false;
  urlImageSendPopUpImage = "";

  // For Component profile-friend
  canShowPopUpProfileFriend = false;
  idFriendSendPopUpProfile = "";


  // pagination
  showButtonMoreSee = true;
  page = 1;
  numberResults = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private socketClientService: SocketClientService
    ) {
    const idFriend = this.activatedRoute.snapshot.paramMap.get('idFriend') as string;
    this.idConversation = this.activatedRoute.snapshot.paramMap.get('idConversation') as string;
    this.user = this.userService.user;
    
    this.getFriendByidUser(idFriend);
    this.getLastTenMessageByIdConversation(this.idConversation);
    this.socketClientService.notifyForConversatino(this.idConversation);
    this.socketClientService.callbackForConversation.subscribe(
      () => { this.getLastTenMessageByIdConversation(this.idConversation, this.page); this.showButtonMoreSee = true; }
    );
  } 

  getFriendByidUser(idFriend: string){
    this.userService.getByIdUser(idFriend).subscribe(
      (result: any) => { this.assignDataUser(result); }
    );
  }

  getLastTenMessageByIdConversation(idConversation: string, page = this.page){
    this.numberResults = this.arrayMessages.length;
    this.arrayMessages = [];
    this.page = page;
    
    this.messageService.getLastTenMessageByIdConversation(idConversation, page)
    .subscribe( (result: any[]) => {      

      if(this.numberResults === result.length){ this.showButtonMoreSee = false;}

      this.formatDataMessage(result.reverse());
    });
  }

  formatDataMessage(data: any[]){

    data.forEach( (element: any) => {

      const messageTemp: CustomMessageInterface = {
        active: element.active,
        body: element.body,
        createDate: new Date(element.createDate),
        idConversation: element.idConversation,
        idMessage: element.idMessage,
        idUser: element.idUser,
        timeMilliseconds: new Date(element.createDate).getTime(),
        timeDays: new Date(element.createDate).toLocaleDateString(),
        timeHour: moment(new Date(element.createDate)).fromNow()
      };
      this.arrayMessages.push(messageTemp);
    });
  }

  showOptions(){
    const elementList = document.querySelector('#idListOptions');
    const elementIcon = document.querySelector('#idIcon');
    elementIcon?.classList.toggle('bx-menu-alt-right');
    elementIcon?.classList.toggle('bx-x');
    elementList?.classList.toggle('show');
  }

  showPopUpImage(urlImage = this.urlImageSendPopUpImage){
    this.urlImageSendPopUpImage = urlImage;
    this.canShowPopUpImage = !this.canShowPopUpImage;
  }

  showProfileFriend(idUserFriend = this.idFriendSendPopUpProfile){
    this.idFriendSendPopUpProfile = idUserFriend;
    this.canShowPopUpProfileFriend = !this.canShowPopUpProfileFriend;
  }

  sendMessage(value: string){
    if(!value.trim()){
      return ;
    }

    this.messageService.createMessage(this.user.idUser, this.idConversation, value)
    .subscribe( (result) => {
      this.inputSendMessage.nativeElement.value = '';      
    });
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
    this.friend = newUser;
  }

}

