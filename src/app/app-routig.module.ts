import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';

// Guards
import { GuardUserGuard } from './core/guards/guard-user.guard';

//Components
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule )
    },
    {
        path:'auth',
        loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule )
    },
    {
        path:'chat',
        canLoad: [ GuardUserGuard ],
        canActivate:[GuardUserGuard],
        loadChildren: () => import('./modules/main/main.module').then( m => m.MainModule)
    },
    {
        path:'404',
        component: NotFoundComponent
    },
    {
        path:'**', redirectTo: '404'
    }
];

@NgModule({
    declarations:[],
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
