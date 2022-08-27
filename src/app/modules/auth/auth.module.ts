import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPassowrdComponent } from './pages/forgot-passowrd/forgot-passowrd.component';

@NgModule({
    declarations:[
        LoginComponent,
        SignUpComponent,
        ForgotPassowrdComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    exports:[
        AuthRoutingModule
    ]
})

export class AuthModule{}
