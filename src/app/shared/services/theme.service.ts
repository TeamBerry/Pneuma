import { Injectable } from '@angular/core';
import { AuthSubject } from '../models/session.model';
import { AuthService } from 'app/core/auth/auth.service';

export const darkTheme = {
    'background-main-color': '#0B1A2D',
    'background-main-hover-color': '#102641',
    'background-main-active-color': '#1a3e6a',
    'background-main-border-color': '#979797',
    'background-secondary-color': '#0B1A38',
    'background-secondary-color-alternate': '#0f244d',
    'input-main-color': '#D0D0D0',
    'text-main-color': 'white',
    'background-focus-color': '#192929',
    'text-focus-color': '#009AEB',
    'text-system-color': '#BBBBBB',
    'stroke-color': '#BBBBBB',
    'inactive-color': '#CCCCCC'
}

export const lightTheme = {
    'background-main-color': 'white',
    'background-main-hover-color': '#f2f2f2',
    'background-main-active-color': '#d9d9d9',
    'background-main-border-color': '#979797',
    'background-secondary-color': '#0B1A38',
    'background-secondary-color-alternate': '#0f244d',
    'input-main-color': '#d0d0d0',
    'text-main-color': 'black',
    'background-focus-color': '#e6e6e6',
    'text-focus-color': '#009AEB',
    'text-system-color': '#444444',
    'stroke-color': '#444444',
    'inactive-color': '#8f8f8f',
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    user: AuthSubject = AuthService.getAuthSubject();

    constructor() { }

    toggleDark() {
        this.setTheme(darkTheme)
        this.user.settings.theme = 'dark'
        localStorage.setItem('BBOX-user', JSON.stringify(this.user));
    }

    toggleLight() {
        this.setTheme(lightTheme)
        this.user.settings.theme = 'light'
        localStorage.setItem('BBOX-user', JSON.stringify(this.user));

    }

    private setTheme(theme: {}) {
        Object.keys(theme).forEach(key =>
            document.documentElement.style.setProperty(`--${key}`, theme[key])
        );
    }
}
