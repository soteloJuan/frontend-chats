import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPassowrdComponent } from './pages/forgot-passowrd/forgot-passowrd.component';

const routes: Routes = [
    {
        path: '', component:LoginComponent
    },
    {
        path: 'login', component:LoginComponent
    },
    {
        path: 'signUp', component:SignUpComponent
    },
    {
        path: 'forgotPassword', component: ForgotPassowrdComponent
    },
    {
        path: '**', redirectTo:'404'
    }
];

@NgModule({
    declarations:[],
    imports:[ RouterModule.forChild(routes)],
    exports:[
        RouterModule,
    ]
})

export class AuthRoutingModule{}
