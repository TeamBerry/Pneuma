import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BoxWidgetComponent } from './shared/components/box-widget/box-widget.component';
import { FeaturedBoxCardComponent } from './shared/components/featured-box-card/featured-box-card.component';
import { FeaturedBoxesCarouselComponent } from './shared/components/featured-boxes-carousel/featured-boxes-carousel.component';
import { HomeComponent } from './shared/components/home/home.component';
import { BoxFormComponent } from './shared/components/box-form/box-form.component';
import { PlaylistFormComponent } from './shared/components/playlist-form/playlist-form.component';
import { InviteFormComponent } from './shared/components/invite-form/invite-form.component';

// Auth component
import { NavComponent } from './core/nav/nav.component'; // Exceptional, so it can benefit from the auth directive
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { SignupFormComponent } from './shared/components/signup-form/signup-form.component';

// Settings
import { SettingsDirective } from './shared/directive/settings.directive';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

/* Feature Modules */
import { JukeboxModule } from './modules/jukebox/jukebox.module';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { InviteComponent } from './pages/invite/invite.component';

// External Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClipboardModule } from 'ngx-clipboard';
import { BoxJoinComponent } from './shared/components/box-join/box-join.component';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
    declarations: [
        AppComponent,
        BoxWidgetComponent,
        FeaturedBoxCardComponent,
        HomeComponent,
        BoxFormComponent,
        LoginFormComponent,
        SignupFormComponent,
        NavComponent,
        SettingsDirective,
        UserSettingsComponent,
        PlaylistFormComponent,
        PasswordResetComponent,
        InviteFormComponent,
        BoxJoinComponent,
        FeaturedBoxesCarouselComponent,
        InviteComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        JukeboxModule,
        NgbModule,
        ColorPickerModule,
        ClipboardModule,
        QrCodeModule
    ],
    exports: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        BoxFormComponent,
        LoginFormComponent,
        SignupFormComponent,
        UserSettingsComponent,
        PlaylistFormComponent,
        InviteFormComponent,
        BoxJoinComponent
    ]
})
export class AppModule { }
