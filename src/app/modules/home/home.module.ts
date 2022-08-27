import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import {CommonModule} from '@angular/common';


// components

import { PresentationComponent } from './pages/presentation/presentation.component';


@NgModule({
    declarations:[
      PresentationComponent
    ],
    imports:[
      HomeRoutingModule,
      CommonModule
    ],
    exports:[
      HomeRoutingModule
    ]
})

export class HomeModule{}
