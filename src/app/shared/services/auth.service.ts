import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user.model';
import { SessionInfo } from '../models/sessioninfo.model';
import { LoginInfo } from '../models/logininfo.model';
import { SharedConstants } from '../modules/shared.constants';

const SESSION_TIMEOUT_IN_MILLIS: number = 1200000; // 20 Minutes
const AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS: number = 900000; // 15 Minutes
const SESSION_STORAGE_INFO: string = 'sessionInfo';

@Injectable()
export class AuthService {
    private redirectUrl: string = null;

    constructor(
        private router: Router,
        private http: Http
    ) {}

    public login(loginInfo: LoginInfo): Observable<any> {
        console.log('loginInfo', loginInfo);
        
        const url: string = SharedConstants.getLoginUrl();
        const body: Object = {
            "username": loginInfo.Username,
            "password": loginInfo.Password
        };
        const options: RequestOptionsArgs = {
            headers: new Headers({ "applicationName": SharedConstants.APP_NAME_CORE })
        };
        return this.http.post(url, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }


    public isAuthenticated(): boolean {
        const sessionInfoString = sessionStorage.getItem(SESSION_STORAGE_INFO);
        const sessionInfo: SessionInfo = sessionInfoString ? this.getSessionInfo(sessionInfoString) : null;
        const authTokenRefreshTime: Date = sessionInfo ? sessionInfo.AuthTokenRefreshTime : null;
        const loggedInTime: Date = sessionInfo ? sessionInfo.LoggedInTime : null;
        const lastActivityTime: Date = sessionInfo ? sessionInfo.LastActivityTime : null;

        const now = new Date().getTime();
        const lastActivityElapsedTime = lastActivityTime ? now - lastActivityTime.getTime() : -1;
        const authTokenElapsedTime = authTokenRefreshTime ? now - authTokenRefreshTime.getTime() : -1;
        
        if (lastActivityElapsedTime > -1 && lastActivityElapsedTime < SESSION_TIMEOUT_IN_MILLIS) {
            if (authTokenElapsedTime > -1 && authTokenElapsedTime < AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS) {
                return true;
            } else {
                // Re-validate the AuthToken by issuing a call to UserInfo to ensure that the authToken is still valid
                // Update the authTokenRefreshTime in sessionStorage
            }
        } else {
            return false;
        }
    }

    public storeAuthenticationInfo(authInfo: any): void {
        const user: User = new User(authInfo);
        const now = new Date();
        const sessionInfo: SessionInfo = new SessionInfo(user, now, now, now);
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public removeAuthenticationInfo(): void {
        sessionStorage.removeItem(SESSION_STORAGE_INFO);
    }

    public setRedirectUrl(redirectUrl: string): void {
        this.redirectUrl = redirectUrl;
    }

    public redirect(): void {
        if (!this.redirectUrl) {
            this.redirectUrl = '/';
        }

        this.router.navigate([this.redirectUrl]);
    }

    private getSessionInfo(sessionInfoString): SessionInfo {
        return SessionInfo.parseString(sessionInfoString);
    }
}
