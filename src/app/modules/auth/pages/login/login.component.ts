import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { FieldValidationService } from '../../../../shared/services/filedValidation.service';

import { LoginUserInterface } from '../../interfaces/LoginUser.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  formUser!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private fieldValidationService: FieldValidationService,
    private alertService: AlertService
  ) { 
    this.createForm();
    this.fieldValidationService.myForm = this.formUser;
  }

  createForm(){
    this.formUser = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldInvalid( field: string ): Boolean{
    return this.fieldValidationService.isValidField(field);
  }

  sendData(){
    const data = this.formUser.value;

    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
      return;
    } 

    const userData: LoginUserInterface = {
      userName: data.userName,
      password: data.password
    };

    this.authService.login(userData).subscribe({
      next: (result) => {
        this.alertService.alertaSuccess('Welcome!');
        this.router.navigateByUrl('chat/listChats');
        this.cleanForm();
      },
      error: (error) => {
        const message = error.error.message || '!Error!';
        this.alertService.alertaWarning(`${message}`);
      }
    });

  }

  cleanForm(){
    this.formUser.reset({});
  }

  forgotMyPassword(){
    this.router.navigateByUrl('auth/forgotPassword');
  }

  back(){
    this.router.navigateByUrl('/');
  }

  changeColoImage(){
    const img:any = document.querySelector('img');
    img.classList.toggle('gray');
  }


}
