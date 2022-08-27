import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { PresentationComponent } from './pages/presentation/presentation.component';

const routes: Routes = [
    {
        path:'', component: PresentationComponent,
    },
    {
        path:'**', redirectTo: '404'
    }
];

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HomeRoutingModule{}
