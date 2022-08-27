import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.css']
})

export class ForgotPassowrdComponent implements OnInit {

  isEmail: any;
  emailFocus = false;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    const inputElemet = document.querySelector('.input');
    inputElemet?.addEventListener('blur', () => { this.validateInput(); });
  }

  sendData(){
    this.isEmail = this.validateInput();
    if(!this.isEmail) { this.alertService.alertaWarning("Your Email is Invalid"); return ;}
    this.alertService.alertaSuccess('Check your email, We have sent you an Email!');
  }

  validateInput(){
    const inputElemet = document.querySelector('input');
    const value: any = inputElemet?.value;
    this.isEmail = this.validateEmail(value);

    if(!this.isEmail){
      this.emailFocus = true; 
      return false;
    }else{
      this.emailFocus = true;
      return true;
    }
  }

  back(){
    this.router.navigateByUrl('/auth/login');
  }

  changeColoImage(){
    const img:any = document.querySelector('img');
    img.classList.toggle('gray');
  }

  validateEmail(email = ""){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

}
