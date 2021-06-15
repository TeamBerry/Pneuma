import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Box } from './../models/box.model';
import { UserPlaylist } from '../models/user-playlist.model';
import { ActiveSubscriber } from '@teamberry/muscadine';
import { Invite, PopulatedInvite } from '../models/invite.model';

@Injectable()
export class BoxService {

    constructor(
        private http: HttpClient
    ) { }


    /**
     * Gets all boxes
     *
     * @returns
     * @memberof BoxService
     */
    index(): Observable<Box[]> {
        return this.http.get<Box[]>(environment.araza + '/box');
    }


    /**
     * Gets one box
     *
     * @param id The unique token of the box
     * @returns
     * @memberof BoxService
     */
    show(id: string): Observable<Box> {
        return this.http.get<Box>(environment.araza + '/box/' + id);
    }


    /**
     * Stores a new box in the database
     *
     * @param box
     * @returns
     * @memberof BoxService
     */
    store(box: Box): Observable<Box> {
        // Omitting the _id so mongo can send it correctly created
        delete box._id
        return this.http.post<Box>(environment.araza + '/box', box);
    }

    /**
     * Updates a box in the database
     *
     * @param box
     * @returns
     * @memberof BoxService
     */
    update(box: Box): Observable<Box> {
        return this.http.put<Box>(environment.araza + '/box/' + box._id, box);
    }

    /**
     * Deletes a box
     *
     * @param id The Mongo ObjectId of the box
     * @returns
     * @memberof BoxService
     */
    delete(id: string): Observable<Box> {
        return this.http.delete<Box>(environment.araza + '/box/' + id);
    }

    /**
     * Closes a box.
     *
     * @param box The box to close
     * @returns The closed box
     * @memberof BoxService
     */
    close(box: Box): Observable<Box> {
        return this.http.post<Box>(environment.araza + '/box/' + box._id + '/close', null);
    }

    /**
     * Opens a box
     *
     * @param box The box to close
     * @returns The opened box
     * @memberof BoxService
     */
    open(box: Box): Observable<Box> {
        return this.http.post<Box>(environment.araza + '/box/' + box._id + '/open', null);
    }

    convert(sourceBox: string, targetPlaylist: string) {
        return this.http.post<UserPlaylist>(
            `${environment.araza}/box/${sourceBox}/convert`,
            {
                _id: targetPlaylist
            }
        )
    }

    generateInvite(boxToken: string, expiration: number = 900): Observable<Invite> {
        return this.http.post<Invite>(`${environment.araza}/boxes/${boxToken}/invite`, { expiration });
    }

    matchInvite(link: string): Observable<Invite> {
        return this.http.get<Invite>(`${environment.araza}/invites/${link}`);
    }

    public invites(boxToken: string): Observable<Array<PopulatedInvite>> {
        return this.http.get<Array<PopulatedInvite>>(`${environment.araza}/boxes/${boxToken}/invites`)
    }

    /**
     * Lists the users currently connected to the box
     *
     * @param box
     * @returns
     * @memberof JukeboxService
     */
    public users(box: string): Observable<Array<ActiveSubscriber>> {
        return this.http.get<Array<ActiveSubscriber>>(`${environment.araza}/box/${box}/users`)
    }
}
