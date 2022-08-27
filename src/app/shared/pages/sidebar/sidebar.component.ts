import { Component, OnInit, AfterViewInit } from '@angular/core';

// services 
import { AlertService } from '../../services/alert.service';
import { SocketClientService } from '../../services/socket-client.service';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent{
  
  constructor(
    private alertService: AlertService,
    private socketClientService: SocketClientService,
    private authService: AuthService
  ) { }

  clickLogout(){
    this.alertService.alertaQuestion('Estas Seguro', 'Se Cerrara la Sesión', 'Si')
    .then( (result) => {
      if(result.isConfirmed){
        this.socketClientService.desconexion();
        this.authService.logout();
      }
    });
  }

}
