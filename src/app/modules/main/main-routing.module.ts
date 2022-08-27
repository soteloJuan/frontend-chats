import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';

// Components
import { MainComponent } from './pages/main/main.component';
import { ListConversationsComponent } from './pages/list-conversations/list-conversations.component';
import { ListFriendsComponent } from './pages/list-friends/list-friends.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ConversationComponent } from './pages/conversation/conversation.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children:[
            {
                path: '', redirectTo: 'listChats', pathMatch:'full'
            },
            {
                path: 'listChats', component: ListConversationsComponent
            },
            {
                path: 'friends', component: ListFriendsComponent
            },
            {
                path: 'myProfile', component: MyProfileComponent
            },
            {
                path: 'conversation/:idFriend/:idConversation', component: ConversationComponent
            },
            {
                path:'**', redirectTo: '404'
            }
        ]
    },
    {
        path:'**', redirectTo: '404'
    }
];

@NgModule({
    declarations:[],
    imports:[ RouterModule.forChild(routes)],
    exports:[
        RouterModule,
    ]
})

export class MainRoutingModule{}
