import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

// services
import { BackgroundMainService } from '../../../../shared/services/backgrounMain.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { SocketClientService } from '../../../../shared/services/socket-client.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  @ViewChild('idContentMain') idContentMain!: ElementRef;

  banderaSidebar = true;

  constructor(
    public backgroundMainService: BackgroundMainService,
    private userService: UserService,
    private alertService: AlertService,
    private  socketClientService: SocketClientService
  ) {

    this.backgroundMainService.imageBackground = this.userService.user.urlWallpaper;
    this.socketClientService.callbackNewMessage.subscribe( (message:any) => {
      this.alertService.alertaNotication(message);
    });

  }
  
    
  clickSidebar(){

    (this.banderaSidebar) ? (this.banderaSidebar = false) : (this.banderaSidebar = true);

  }

}
