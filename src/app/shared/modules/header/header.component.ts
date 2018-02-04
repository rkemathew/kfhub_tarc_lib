import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    public isShowMenu: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private utilsService: UtilsService
    ) {};

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
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

    redirectToTalent() {
    }
}
