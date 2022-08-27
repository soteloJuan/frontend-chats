import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { PopUpImageComponent } from './pages/pop-up-image/pop-up-image.component';
import { ProfileFriendComponent } from './pages/profile-friend/profile-friend.component';

import { NotBackgroundPipe }from './pipes/not-background.pipe';
import { NotImagePipe } from './pipes/not-image.pipe';

// Components

@NgModule({
    declarations:
    [
        NotFoundComponent,
        SidebarComponent,
        NotImagePipe,
        NotBackgroundPipe,
        PopUpImageComponent,
        ProfileFriendComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        NotFoundComponent,
        SidebarComponent,
        NotImagePipe,
        PopUpImageComponent,
        ProfileFriendComponent,
        NotBackgroundPipe
    ]
})
export class SharedModule{}
