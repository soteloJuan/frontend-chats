import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//services
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthService } from '../../../auth/services/auth.service';
import { BackgroundMainService } from '../../../../shared/services/backgrounMain.service';
import { FieldValidationService } from '../../../../shared/services/filedValidation.service';
import { ValidatorService } from '../../../../shared/services/validator.service';

// models
import { User } from '../../../../core/models/User';

// interfaces
import { UserUpdateBaicInterfaces } from '../../interfaces/UserInterfaces';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent {

  canShowPopUpImageFriend = false;
  user!: User;
  formUpdateBasic!: FormGroup;
  formUpdatePassword!: FormGroup;

  canShowFormUpdateBasic = false;
  canShowFormUpdatePassword = false;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private backgroundMainService: BackgroundMainService,
    private fb: FormBuilder,
    private fieldValidationService: FieldValidationService,
    private validatorService: ValidatorService
  ) {
    this.user = this.userService.user;
    this.createFormUpdateBasic();
    this.resetFormUpdateDataBasic();
    this.createFormUpdatePassword();
  }


  isFieldInvalid( field: string ): Boolean{
    return this.fieldValidationService.isValidField(field);
  }

  async updateProfileImage(){
    const valueFile = await this.alertService.alertUpdateImage();
    if(valueFile){
      this.userService.updateImageProfile(valueFile, this.user.idUser)
      .subscribe({
        next: (result: any) => {
          this.authService.assignDataUser(result.data[0]);
          this.user = this.userService.user;
          this.alertService.alertaSuccess('Successfully Update Image');
        },
        error: (error) => { this.alertService.alertaErrorWithMessage('Image Update Failed');}
      });
    }
    else if(valueFile === null){
      this.alertService.alertaWarning('Select An Image!');
    }
  }

  async updateWallpaperImage(){
    const valueFile = await this.alertService.alertUpdateImage();
    if(valueFile){
      this.userService.updateImageWallpaper(valueFile, this.user.idUser)
      .subscribe({
        next: (result: any) => {
          this.authService.assignDataUser(result.data[0]);
          this.user = this.userService.user;
          this.backgroundMainService.imageBackground = this.user.urlWallpaper;
          this.alertService.alertaSuccess('Successfully Update Image');
        },
        error: (error) => { this.alertService.alertaErrorWithMessage('Image Update Failed');}
      });
    }
    else if(valueFile === null){
      this.alertService.alertaWarning('Select An Image!');
    }
  }

  showPopUpImage(){
    this.canShowPopUpImageFriend = !this.canShowPopUpImageFriend;
  }
  
  showUpdateBasicInformation(){
    this.fieldValidationService.myForm = this.formUpdateBasic;
    this.canShowFormUpdateBasic = !this.canShowFormUpdateBasic;
    
    setTimeout(() => {      
      const contentUpdateBasicElement = document.querySelector('.content-update-basic');
      contentUpdateBasicElement?.classList.toggle('show');
    }, 100);
  }

  showUpdatePassword(){
    this.fieldValidationService.myForm = this.formUpdatePassword;
    this.canShowFormUpdatePassword = !this.canShowFormUpdatePassword;

    setTimeout(() => {      
      const contentUpdateBasicElement = document.querySelector('.content-update-password');
      contentUpdateBasicElement?.classList.toggle('show');
    }, 100);
  }

  sendDataBasic(){

    const data = this.formUpdateBasic.value;
      
    if (this.formUpdateBasic.invalid) {
      this.formUpdateBasic.markAllAsTouched();
      return;
    }

    const newData: UserUpdateBaicInterfaces = {
      fullName: data.fullName,
      email: data.email,
      aboutMe: data.aboutMe,
      status: data.status,
      userName: data.userName
    };

    this.userService.updateBasicInformation(newData).subscribe({
      next: (result: any) => {
        this.authService.assignDataUser(result.data[0]);
        this.user = this.userService.user;
        this.alertService.alertaSuccess('User Updated Successfully!');
        this.showUpdateBasicInformation();
      },
      error: (error) => {
        const message = error.error.message || '!Error!';
        this.alertService.alertaWarning(`${message}`);
      }
    });
  }

  sendDataPassword(){
    const data = this.formUpdatePassword.value;
      
    if (this.formUpdatePassword.invalid) {
      this.formUpdatePassword.markAllAsTouched();
      return;
    }

    const newPassword = {
      password: data.password
    };
    this.userService.updatePassword(newPassword).subscribe({
      next: (result: any) => {
        this.alertService.alertaSuccess('Password Updated Successfully!');
        this.showUpdatePassword();
        this.cleanForm();
      },
      error: (error) => {
        const message = error.error.message || '!Error!';
        this.alertService.alertaWarning(`${message}`);
      }
    });

  }

  resetFormUpdateDataBasic(){
    this.formUpdateBasic.reset({
      fullName: this.user.fullName,
      email: this.user.email,
      aboutMe: this.user.aboutMe,
      status: this.user.status,
      userName: this.user.userName
    });
  }

  cleanForm(){
    this.formUpdatePassword.reset({});
    this.formUpdateBasic.reset({});
  }

  createFormUpdateBasic(){
    this.formUpdateBasic = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      aboutMe: [''],
      status: [''],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    });
  }

  createFormUpdatePassword(){
    this.formUpdatePassword = this.fb.group({
      password: ['', Validators.required],
      confirmationPassword: ['', Validators.required],
    },{
      validators: this.validatorService.samePasswords('password','confirmationPassword')
    });
  }

}
