import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// components
import { MainComponent } from './pages/main/main.component';
import { ListFriendsComponent } from './pages/list-friends/list-friends.component';
import { ListConversationsComponent } from './pages/list-conversations/list-conversations.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ConversationComponent } from './pages/conversation/conversation.component';



@NgModule({
    declarations:[    
        MainComponent,
        ListFriendsComponent,
        ListConversationsComponent,
        MyProfileComponent,
        ConversationComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MainRoutingModule,
        SharedModule
    ],
    exports:[
        MainRoutingModule
    ]
})

export class MainModule{}
