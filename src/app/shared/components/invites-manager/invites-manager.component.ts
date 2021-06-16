import { Component, Input, OnInit } from '@angular/core';
import { Invite, PopulatedInvite } from 'app/shared/models/invite.model';
import { BoxService } from 'app/shared/services/box.service';

@Component({
  selector: 'app-invites-manager',
  templateUrl: './invites-manager.component.html',
  styleUrls: ['./invites-manager.component.scss']
})
export class InvitesManagerComponent implements OnInit {
    @Input() boxToken: string;
    invites: Array<PopulatedInvite> = [];

    isLoading = true;

    constructor(
      private boxService: BoxService,
  ) { }

    ngOnInit() {
        this.boxService.invites(this.boxToken).subscribe(
            (invites) => {
                this.invites = invites;
                this.isLoading = false;
            }
      )
    }

    revokeInvite(id: string) {
        this.boxService.revokeInvite(this.boxToken, id).subscribe(
            () => {
                const targetIndex = this.invites.findIndex((invite) => invite._id === id)
                this.invites.splice(targetIndex, 1);
            }
        )
    }

}
