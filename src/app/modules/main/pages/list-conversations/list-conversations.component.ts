import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketClientService } from '../../../../shared/services/socket-client.service';
import { Router } from '@angular/router';

// services
import { UserService } from '../../services/user.service';
import { ConversationService } from '../../services/conversations.service';
import { User } from '../../../../core/models/User';
import { MessageService } from '../../services/message.service';
import { AlertService } from '../../../../shared/services/alert.service';

// interfaces 
import { LatestConversationsInterfaces } from '../../interfaces/LastestConversationInterfaces';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.css']
})

export class ListConversationsComponent{
  
  isSearching = false;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  user!: User;
  dateNow = new Date().toLocaleDateString();
  arrayConversations: LatestConversationsInterfaces[]  = [];
  arrayConversationsCopy: LatestConversationsInterfaces[]  = [];
  arrayIdConversationAndIdUser: any[] = [];

  // For Component Popup-image
  canShowPopUpImage = false;
  urlImageSendPopUpImage = "";

  constructor(
    private socketClientService: SocketClientService,
    private userService: UserService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private router: Router,
    private alertService: AlertService
  ) {

    this.socketClientService.callbackNewMessage.subscribe( (res) => {
      this.arrayConversations = [];
      this.getAllConversation();
    });
    
    this.user = this.userService.user;
    this.getAllConversation();
  }


  getAllConversation(){
    this.conversationService.getAllConversations(this.user.idUser).subscribe({
      next: (result: any[]) => { 
        const arrayIdConversations: any[] = [];      

        result.forEach( (element) => {
          let idUser = '';
          (element.idUserOne === this.user.idUser) ? (idUser = element.idUserTwo) : (idUser = element.idUserOne);
          const newObject = {
            idConversation: element.idConversation,
            idUser
          };
          this.arrayIdConversationAndIdUser.push(newObject);
          arrayIdConversations.push(element.idConversation);
        });
        this.getAllLastMessageFromConversation(arrayIdConversations);
      }
    });
  }

  getAllLastMessageFromConversation(arrayIdConversations: string[]){
    const responseServices: any[] = [];
    this.messageService.getArrayLastMessageByIdConversation(arrayIdConversations)
    .subscribe({
      next: (result) =>  { if(result)responseServices.push(result); },
      complete: () => this.formatDataConversations(responseServices),
      error: () => {this.alertService.alertaWarning('There was a problem accessing the last messages!'); }
    });
  }

  formatDataConversations(data: any[]){
    const  arrayIdUsers: string[] = [];
    data.forEach( (element) => {

      const idUserFinal  = this.arrayIdConversationAndIdUser.find( (elem) => elem.idConversation === element.idConversation );
      const temp: LatestConversationsInterfaces = {
        idConversation: element.idConversation,
        idUser: idUserFinal.idUser,
        userWhoCreatedMessage: element.idUser,
        bodyMessage: element.body,
        messageTime: new Date(element.createDate),
        messageMilliseconds: new Date(element.createDate).getTime(),
        messageDays: new Date(element.createDate).toLocaleDateString(),
        messageHour: new Date(element.createDate).toLocaleString('es-mx',{hour:'numeric', minute:'numeric', second:'numeric', hour12: true})
      };
      arrayIdUsers.push(temp.idUser);
      this.arrayConversations.push(temp);
    });
    this.getAllUsersConversation(arrayIdUsers);
  }

  getAllUsersConversation(arrayIdUsers: string[]){
    const arrayUsers: object[] = [];
    
    this.userService.getArrayUsersByIdUser(arrayIdUsers)
    .subscribe({
      next: (result: any) => arrayUsers.push(
        {
          idUser: result.idUser,
          userName: result.userName,
          urlImage: result.urlImage
        }
      ),
      complete: () => this.formatDataUser(arrayUsers),
      error: () => {this.alertService.alertaWarning('There was a problem accessing the Users!'); }
    });
  }
  
  formatDataUser(arrayUsers: object[]){
    arrayUsers.forEach( (element: any) => {
      const index = this.arrayConversations.findIndex( (conversation) =>  conversation.idUser === element.idUser );
      this.arrayConversations[index].userName = element.userName;
      this.arrayConversations[index].urlImage = element.urlImage;
    });
    this.orderLastMessages();
  }

  orderLastMessages(){
    this.arrayConversations = this.arrayConversations.sort(
      (a, b) => {
        const A = a.messageMilliseconds;
        const B = b.messageMilliseconds;
        let comparison = 0;
        if (A < B) {
          comparison = 1;
        } else if (A > B) {
          comparison = -1;
        }
        return comparison;
      }
    );
    this.arrayConversationsCopy= this.arrayConversations;
  }

  searchMyFriend(value: string){
    this.arrayConversations= this.arrayConversations.filter( (user) => user.userName === value);
    this.isSearching= true;
  }

  closeSearchMyFriend(){
    this.arrayConversations = this.arrayConversationsCopy;
    this.isSearching = false;
    this.inputSearch.nativeElement.value = '';
  }

  showPopUpImage(urlImage = this.urlImageSendPopUpImage){
    this.urlImageSendPopUpImage = urlImage;
    this.canShowPopUpImage = !this.canShowPopUpImage;
  }

  showConversation(idConversation: string, idFriend: string){
    this.router.navigate(['/chat/conversation', idFriend, idConversation]);
  }

}
