import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            const url: string = state.url;
            this.auth.setRedirectUrl(url);
            this.router.navigate(['/login']);
            return false;
        }
    }
}
