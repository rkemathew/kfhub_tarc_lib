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
    constructor(
        private router: Router,
        private location: Location,
        private authService: AuthService
    ) {};

    logout(): void {
        this.authService.removeAuthenticationInfo();
        this.router.navigate(['/login']);
    }

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }
}
