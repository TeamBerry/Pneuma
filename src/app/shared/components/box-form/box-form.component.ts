import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Box } from './../../models/box.model';
import { BoxService } from './../../services/box.service';
import { AuthService } from 'app/core/auth/auth.service';
import { User } from 'app/shared/models/user.model';
import { AuthSubject } from 'app/shared/models/session.model';
import { UserService } from 'app/shared/services/user.service';

@Component({
    selector: 'app-box-form',
    templateUrl: './box-form.component.html',
    styleUrls: ['./box-form.component.scss'],
    providers: [BoxService]
})
export class BoxFormComponent implements OnInit {
    @Input() title: string;
    @Input() box: Box;

    tabSetOptions = [
        { title: `General`, value: 'details' },
        { title: 'Moderation', value: 'moderation' },
    ]
    displayTab: 'details' | 'moderation' | 'invites' = 'details';

    public session: AuthSubject = AuthService.getAuthSubject();

    public langs: Array<{ key: string, value: string }> = [
        {
            key: 'cs',
            value: 'Čeština'
        },
        {
            key: 'da',
            value: 'Dansk'
        },
        {
            key: 'de',
            value: 'Deutsch'
        },
        {
            key: 'en',
            value: 'English'
        },
        {
            key: 'es',
            value: 'Español'
        },
        {
            key: 'fr',
            value: 'Français'
        },
        {
            key: 'hr',
            value: 'Hrvatski jezik'
        },
        {
            key: 'it',
            value: 'Italiano'
        },
        {
            key: 'pl',
            value: 'Język polski'
        },
        {
            key: 'lv',
            value: 'Latviešu valoda'
        },
        {
            key: 'lt',
            value: 'Lietuvių kalba'
        },
        {
            key: 'hu',
            value: 'Magyar'
        },
        {
            key: 'nl',
            value: 'Nederlands'
        },
        {
            key: 'no',
            value: 'Norsk'
        },
        {
            key: 'pt',
            value: 'Português'
        },
        {
            key: 'ro',
            value: 'Română'
        },
        {
            key: 'sk',
            value: 'Slovenčina'
        },
        {
            key: 'fi',
            value: 'Suomi'
        },
        {
            key: 'sv',
            value: 'Svenska'
        },
        {
            key: 'vi',
            value: 'Tiếng Việt'
        },
        {
            key: 'tr',
            value: 'Türkçe'
        },
        {
            key: 'el',
            value: 'Ελληνικά'
        },
        {
            key: 'bg',
            value: 'Български език'
        },
        {
            key: 'ru',
            value: 'Pусский'
        },
        {
            key: 'th',
            value: 'ภาษาไทย'
        },
        {
            key: 'zh-cn',
            value: '中文 简体'
        },
        {
            key: 'zh-tw',
            value: '中文 繁體'
        },
        {
            key: 'ja',
            value: '日本語'
        },
        {
            key: 'ko',
            value: '한국어'
        }
    ];

    submitted = false;

    context = 'Edit';
    ready = false;

    constructor(
        public boxService: BoxService,
        public activeModal: NgbActiveModal,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        if (!this.box) {
            this.context = 'Create';
            this.box = new Box();
            this.userService.show(this.session._id).subscribe(
                (user: User) => {
                    this.box.creator = {
                        _id: this.session._id,
                        name: this.session.name
                    }
                    this.box.acl = user.acl;
                    this.ready = true;
                }
            )
        } else {
            this.tabSetOptions.push({ title: 'Invites', value: 'invites' });
            this.ready = true;
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.context === 'Create') {
            this.boxService.store(this.box).subscribe(
                data => {
                    this.activeModal.close();
                    this.router.navigate(['/box/' + data._id]);
                }
            );
        } else {
            this.boxService.update(this.box).subscribe(
                (updatedBox: Box) => {
                    this.activeModal.close();
                }
            )
        }
    }
}
