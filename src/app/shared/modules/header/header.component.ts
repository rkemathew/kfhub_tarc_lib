import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AuthService } from '../../services/auth.service';

const nonAppPages: Array<string> = [
    "/login"
];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    public isShowMenu: boolean = false;

    constructor(
        private router: Router,
        private location: Location,
        private authService: AuthService
    ) {};

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }

    toggleMenu(): void {
        this.isShowMenu = !this.isShowMenu;
    }

    preferences(): void {
        this.isShowMenu = false;
        // TODO:
    }
    
    logout(): void {
        this.isShowMenu = false;
        this.authService.removeSessionInfo();
        this.router.navigate(['/login']);
    }

    hasAdminRole(): boolean {
        return true;
    }

    redirectToAdminModule(): void {
        this.isShowMenu = false;
        // TODO:
    }
}
