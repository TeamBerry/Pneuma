import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

import { environment } from './../../../environments/environment';

@Injectable()
export class PlayerService {
    private connectionOptions = {
        'transports': ['websocket']
    };
    private socket = io('localhost:8008', this.connectionOptions);

    constructor(private http: Http) { }

    connect(token: string, userToken: string) {
        const observable = new Observable(observer => {
            this.socket.on('connect', () => {
                console.log("Connecting to Box socket...");
                this.socket.emit('auth', {
                    origin: 'BERRYBOX PNEUMA',
                    type: 'sync',
                    token,
                    subscriber: userToken
                });
            });

            this.socket.on('confirm', (data) => {
                console.log("connected to socket");
                observer.next(data);
                // Tells the service the user is joining. Response will be on sync
                this.socket.emit('start', {
                    token,
                    subscriber: userToken
                });
            });

            this.socket.on('sync', (data) => {
                console.log('recieved sync data', data);
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    playlist(boxToken: string) {
        return this.http.get(environment.logosUrl + '/box/' + boxToken + '/playlist/all')
            .map((response: Response) => {
                return response.json();
            });
    }

    next(boxToken: string) {
        return this.http.get(environment.logosUrl + '/box/' + boxToken + '/playlist/next')
            .map((response: Response) => {
                return response.json();
            });
    }

    submit(boxToken: string, video) : void{
        this.socket.emit('video', video);
    }

    update(boxToken: string, video) {
        return this.http.put(environment.logosUrl + '/box/' + boxToken + '/playlist/' + video.room_history_id, video)
            .map((response: Response) => {
                return response.json();
            });
    }

    shuffle(boxToken: string) {
        return this.http.get(environment.logosUrl + '/box/' + boxToken + '/playlist/shuffle')
            .map((response: Response) => {
                return response.json();
            });
    }

    swap(boxToken: string, action) {
        return this.http.post(environment.logosUrl + '/box/' + boxToken + '/playlist/swap', action)
            .map((response: Response) => {
                return response.json();
            })
    }

}
