import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthDirective } from '../shared/directive/auth.directive';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { VideoEntryComponent } from './components/video-entry/video-entry.component';
import { BoxDeletionEstimationPipe } from './pipes/box-deletion-estimation.pipe';
import { PlaylistSelectorComponent } from './components/playlist-selector/playlist-selector.component';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PictureUploaderComponent } from './components/picture-uploader/picture-uploader.component';
import { BxAlertComponent } from './components/bx-alert/bx-alert.component';
import { DurationPipe } from './pipes/duration.pipe';
import { BxButtonComponent } from './components/bx-button/bx-button.component';

// Feature Modules
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { BxCheckboxComponent } from './components/bx-checkbox/bx-checkbox.component';
import { BxTabsetComponent } from './components/bx-tabset/bx-tabset.component';
import { BxChipComponent } from './components/bx-chip/bx-chip.component';
import { BoxStatusIndicatorComponent } from './components/box-status-indicator/box-status-indicator.component';
import { BxRequiredInputIndicatorComponent } from './components/bx-required-input-indicator/bx-required-input-indicator.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { AclFormComponent } from './components/acl-form/acl-form.component';
import { LanguageFlagPipe } from './pipes/language-flag.pipe';
import { YouTubeMiniatureDropzoneDirective } from './directive/youtube-miniature-dropzone.directive';
import { PictureDeleterComponent } from './components/picture-deleter/picture-deleter.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { IssueIndicatorComponent } from './components/issue-indicator/issue-indicator.component';
import { InvitesManagerComponent } from './components/invites-manager/invites-manager.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        AngularSvgIconModule,
    ],
    declarations: [
        AuthDirective,
        SlideToggleComponent,
        VideoEntryComponent,
        BoxDeletionEstimationPipe,
        PlaylistSelectorComponent,
        FilterPipe,
        PictureUploaderComponent,
        PictureDeleterComponent,
        BxAlertComponent,
        DurationPipe,
        BxButtonComponent,
        BxCheckboxComponent,
        BxTabsetComponent,
        BxChipComponent,
        BoxStatusIndicatorComponent,
        BxRequiredInputIndicatorComponent,
        ProfilePictureComponent,
        FromNowPipe,
        AclFormComponent,
        LanguageFlagPipe,
        YouTubeMiniatureDropzoneDirective,
        ToggleButtonComponent,
        LoadingIndicatorComponent,
        IssueIndicatorComponent,
        InvitesManagerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthDirective,
        SlideToggleComponent,
        VideoEntryComponent,
        NgbModule,
        BoxDeletionEstimationPipe,
        FilterPipe,
        PictureUploaderComponent,
        PictureDeleterComponent,
        BxAlertComponent,
        DurationPipe,
        BxButtonComponent,
        PickerModule,
        BxCheckboxComponent,
        BxTabsetComponent,
        BxChipComponent,
        BoxStatusIndicatorComponent,
        BxRequiredInputIndicatorComponent,
        ProfilePictureComponent,
        FromNowPipe,
        AclFormComponent,
        LanguageFlagPipe,
        YouTubeMiniatureDropzoneDirective,
        ToggleButtonComponent,
        LoadingIndicatorComponent,
        IssueIndicatorComponent,
        InvitesManagerComponent
    ],
    providers: [AuthDirective, ThemeService, UserService, YouTubeMiniatureDropzoneDirective],
    entryComponents: [
        PictureUploaderComponent,
        PlaylistSelectorComponent
    ]
})
export class SharedModule { }
