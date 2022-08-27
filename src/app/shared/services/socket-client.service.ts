import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { environment } from '../../../environments/environment';
import { UserService } from '../../modules/main/services/user.service';

@Injectable({
    providedIn: 'root'
})

export class SocketClientService  extends Socket{

    callback: EventEmitter<any> = new EventEmitter();
    callbackWelcome: EventEmitter<any> = new EventEmitter();
    callbackNewMessage: EventEmitter<any> = new EventEmitter();
    callbackForConversation: EventEmitter<any> = new EventEmitter();

    constructor( private userService: UserService  ){
        super({
            url: `${environment.apiURL}`, // Como primer argumento le pasamos la URL de nuestro backend
        });       

        this.listen();
        this.welcomeMessage();
        this.notifyNewMessage();
        this.notifyForConversatino();
    }

    listen(){
        this.ioSocket.on('messageSubproces', (res: any) => {
            const newData = JSON.parse(res);
            this.callback.emit(newData);
        });
    }

    welcomeMessage(){
        this.ioSocket.on('welcome', (res: any) => {
            this.callbackWelcome.emit(res);
        });
    }

    notifyNewMessage(){
        this.ioSocket.on(`${this.userService.user.idUser}`, (res: any) => {
            this.callbackNewMessage.emit(res);
        });
    }

    notifyForConversatino(idPortSocket = ""){ // Aqui vamos
        
        this.ioSocket.on(`${idPortSocket}`, (res: any) => {
            this.callbackForConversation.emit(res);
        });
        
    }

    desconexion(){
        this.disconnect();
    }

}
