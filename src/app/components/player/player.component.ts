import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoxService } from 'app/services/box.service';
import { PlayerService } from 'app/services/player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    @Input() token: string;
    @Output() playing: EventEmitter<any> = new EventEmitter();
    private link;
    private video;
    private player;
    private playerEvent;
    private height = '100%';
    private width = '100%';

    constructor(
        private playerService: PlayerService,
        private boxService: BoxService
    ) { }

    ngOnInit() {
        if  (this.token !== undefined) {
            this.playerService.current(this.token).subscribe(
                data => {
                    this.video = data;
                    this.link = data.link;
                }
            );
        }
    }

    onStateChange(event) {
        this.playerEvent = event.data;
        if (this.playerEvent === 0) {
            this.next();
        }
    }

    onPlayerReady(player) {
        this.player = player;
        this.playVideo();
    }

    playVideo() {
        this.player.loadVideoById(this.link);
        this.playing.emit(this.video);
    }

    pauseVideo() {
        this.player.pauseVideo();
    }

    next() {
        this.playerService.next(this.token).subscribe(
            data => {
                if (data !== false) {
                    this.video = data;
                    this.link = data.link;
                    this.playVideo();
                } else {
                    this.video = null;
                    this.playing.emit(this.video);
                }
            }
        )
    }

    shuffle() {

    }

}
