import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { FieldValidationService } from '../../../../shared/services/filedValidation.service';

// interfaces
import { PreUserInterface } from '../../interfaces/PreUser.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{

  formNewUser!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private fieldValidationService: FieldValidationService,
    private alertService: AlertService
  ) {
      this.createForm();
      this.fieldValidationService.myForm = this.formNewUser;
    }

  isFieldInvalid( field: string ): Boolean{
    return this.fieldValidationService.isValidField(field);
  }

  createForm(){
    this.formNewUser = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      aboutMe: [''],
      status: [''],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  sendData(){
    const data = this.formNewUser.value;
      
    if (this.formNewUser.invalid) {
      this.formNewUser.markAllAsTouched();
      return;
    }

    const newUser: PreUserInterface = {
      fullName: data.fullName,
      email: data.email,
      aboutMe: data.aboutMe,
      status: data.status,
      userName: data.userName,
      password: data.password
    };

    this.authService.createNewUser(newUser).subscribe({
      next: () => {
        this.alertService.alertaSuccess('User Create Successfully!');
        this.cleanForm();
      },
      error: (error) => {
        const message = error.error.message || '!Error!';
        this.alertService.alertaWarning(`${message}`);
      }
    });
  }
    
  cleanForm(){
    this.formNewUser.reset({});
  }

  clickBack(){
    this.router.navigateByUrl('/');
  }
}





