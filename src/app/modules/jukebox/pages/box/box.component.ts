import { Component, OnInit, HostListener } from '@angular/core';
import { BoxService } from './../../../../shared/services/box.service';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';

import { JukeboxService } from './../../jukebox.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Box } from 'app/shared/models/box.model';
import { filter } from 'rxjs/operators';
import { AuthSubject } from 'app/shared/models/session.model';
import { BoxFormComponent } from 'app/shared/components/box-form/box-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistSelectorComponent } from 'app/shared/components/playlist-selector/playlist-selector.component';
import { PlaylistService } from 'app/shared/services/playlist.service';
import { ToastrService } from 'ngx-toastr';
import { SyncPacket, FeedbackMessage, VideoSubmissionRequest, Permission, PlayingItem } from '@teamberry/muscadine';
import { InviteFormComponent } from 'app/shared/components/invite-form/invite-form.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    providers: [BoxService]
})
export class BoxComponent implements OnInit {
    /**
     * Token of the box. Unique indentifier (ObjectID from MongoDB)
     *
     * @type {string}
     * @memberof BoxComponent
     */
    token: string;

    /**
     * Box itself
     *
     * @type {Box}
     * @memberof BoxComponent
     */
    box: Box;

    /**
     * Loading flag to hide or show parts of the DOM depending on their state of readiness
     *
     * @memberof BoxComponent
     */
    loading = true;

    /**
     * The currently playing video in the box. Gets refreshed by sockets and sent to the player and mood widgets
     *
     * @memberof BoxComponent
     */
    currentVideo: PlayingItem = null;

    /**
     * Connected user. Obtained from the auth service
     *
     * @type {User}
     * @memberof BoxComponent
     */
    user: AuthSubject = AuthService.getAuthSubject();

    /**
     * The number of berries the user has
     *
     * @type {number}
     * @memberof BoxComponent
     */
    berryCount: number;

    connectionStatus = 'offline';
    isDraggingMiniature = false;
    isRemoteControl = false;
    isMobile = false;

    permissions: Array<Permission> = [];

    constructor(
        private boxService: BoxService,
        private jukeboxService: JukeboxService,
        private playlistService: PlaylistService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private deviceService: DeviceDetectorService
    ) {
        this.isMobile = !this.deviceService.isDesktop();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.token = params.token;
            this.loadBox();
            this.monitorConnectionStatus();
            this.listenForBoxChanges();
        });
        this.jukeboxService.getPermissions().subscribe(permissions => this.permissions = permissions);
    }

    /**
     * Loads the details of the box
     *
     * Only if you're the creator of the box. Else, you just connect to the jukeboxService and get the box from there
     *
     * @memberof BoxComponent
     */
    loadBox() {
        this.boxService.show(this.token).subscribe(
            (box: Box) => {
                this.box = box;
                // Start box once it's loaded
                this.jukeboxService.startBox(this.box);
                this.connectToSyncStream();
                this.loading = false;
            }
        );
    }

    monitorConnectionStatus() {
        this.jukeboxService.getConnection().subscribe(
            (status: string) => {
                this.connectionStatus = status;
            }
        )
    }

    listenForBoxChanges() {
        this.jukeboxService.getBox().subscribe(
            (updatedBox: Box) => {
                this.box = updatedBox
            }
        )
    }

    /**
     * This is where the real-time stuff happens.
     * The box will connect to the server via socket and start synchronising with other users.
     *
     * @memberof BoxComponent
     */
    connectToSyncStream() {
        this.jukeboxService.getBoxStream()
            .pipe(
                filter((syncPacket: SyncPacket) => syncPacket.box === this.box._id)
            )
            .subscribe(
                (syncPacket: SyncPacket) => {
                    this.currentVideo = syncPacket?.item ?? null;
                },
                error => {
                    console.error(error);
                }
            );
    }

    toggleRemoteContollerMode(event: boolean) {
        this.isRemoteControl = event;
        if (!this.isRemoteControl) {
            this.jukeboxService.resync({ boxToken: this.box._id, userToken: this.user._id })
        }
    }


    /**
     * Actions when the player changes state
     *
     * @param event
     * @memberof BoxComponent
     */
    onPlayerStateChange(event: any) {
        if (event === 'ready') {
            this.connectToSyncStream();
        }
    }

    /**
     * Sends a command to skip the currently playing video
     *
     * @memberof BoxComponent
     */
    skipVideo() {
        this.jukeboxService.skipVideo();
    }

    openBoxSettings() {
        const modalRef = this.modalService.open(BoxFormComponent, { size: 'xl' })
        modalRef.componentInstance.title = `Manage Box - ${this.box.name}`
        modalRef.componentInstance.box = cloneDeep(this.box)
    }

    openInviteModal() {
        const modalRef = this.modalService.open(InviteFormComponent)
        modalRef.componentInstance.boxToken = this.box._id
    }

    addToPlaylist() {
        const modalRef = this.modalService.open(PlaylistSelectorComponent)
        modalRef.componentInstance.selectedPlaylist$.subscribe(
            (playlistId: string) => {
                this.playlistService.addVideoToPlaylist(playlistId, { videoId: this.currentVideo.video._id }).toPromise()
                this.toastr.success('Video added', 'Success')
            }
        )
    }

    handleMiniatureDrag(isDraggingMiniature: boolean) {
        this.isDraggingMiniature = isDraggingMiniature;
    }

    submitFromMiniature(miniatureSource: string) {

        if (!this.user.mail) {
            this.handleMiniatureError('ANONYMOUS_ACCOUNT')
            return;
        }

        try {
            const miniatureUrl = /src="?([^"\s]+)"?\s*/.exec(miniatureSource);

            if (!miniatureUrl) {
                this.handleMiniatureError('WRONG_URL');
                return;
            }

            const extractedLink = new RegExp(/ytimg.com\/vi\/([a-z0-9\-\_]+)\//i).exec(miniatureUrl[1]);

            if (!extractedLink) {
                this.handleMiniatureError('WRONG_URL');
                return;
            }

            const video: VideoSubmissionRequest = {
                link: extractedLink[1],
                userToken: this.user._id,
                boxToken: this.box._id
            }

            this.jukeboxService.submitVideo(video);
        } catch (error) {
            this.handleMiniatureError('WRONG_URL');
        }
    }

    handleMiniatureError(error: 'WRONG_URL' | 'ANONYMOUS_ACCOUNT') {
        let contents = ''
        if (error === 'WRONG_URL') {
            contents = 'The miniature image is corrupted or not from YouTube. Please retry with a miniature from YouTube.'
        }
        if (error === 'ANONYMOUS_ACCOUNT') {
            contents = 'You need to be logged in to add videos to the queue. Please log in or create an account.'
        }

        const message: FeedbackMessage = new FeedbackMessage({
            contents,
            scope: this.box._id,
            time: new Date(),
            context: 'error'
        });
        this.jukeboxService.postMessageToStream(message);
    }
}
