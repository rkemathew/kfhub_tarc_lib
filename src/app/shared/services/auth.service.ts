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
    private sessionInfoCache: SessionInfo = null;

    constructor(
        private router: Router,
        private http: Http
    ) {}

    public login(loginInfo: LoginInfo): Observable<any> {
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

    public getUser(userId: number): Observable<any> {
        var method = 'GET';
        var url = SharedConstants.getUsersUrl(userId);
        var headers = null;
        var data = null;
        var isReturnFullResponse = false;

        return this.authHttpCall(method, url, data, headers, isReturnFullResponse);
    };

    public isAuthenticated(): boolean {
        const sessionInfo: SessionInfo = this.getSessionInfo();
        const authTokenRefreshTime: Date = sessionInfo ? sessionInfo.AuthTokenRefreshTime : null;
        const loggedInTime: Date = sessionInfo ? sessionInfo.LoggedInTime : null;
        const lastActivityTime: Date = sessionInfo ? sessionInfo.LastActivityTime : null;

        const now = new Date().getTime();
        const lastActivityElapsedTime = lastActivityTime ? now - lastActivityTime.getTime() : -1;
        const authTokenElapsedTime = authTokenRefreshTime ? now - authTokenRefreshTime.getTime() : -1;
        
        if (lastActivityElapsedTime > -1 && lastActivityElapsedTime < SESSION_TIMEOUT_IN_MILLIS) {
            if (authTokenElapsedTime > -1 && authTokenElapsedTime < AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS) {
                // Update the lastActivityTime since there has been a user action
                const updateAttributes: any = {
                    lastActivityTime: new Date()
                };

                this.updateSessionInfo(updateAttributes);

                return true;
            } else {
                // Time Threshold for re-verifying the AuthToken has elapsed, so re-verifying with a getUser() call
                console.log('AuthTokenRefresh Threshold Elapsed, re-verifying authToken again getUser() API');
                const userId = sessionInfo.User.UserId;
                this.getUser(userId).subscribe((res) => {
                    // Update the lastActivityTime since there has been a user action
                    // Also, update the authTokenRefreshTime as it just got re-verified against the getUser() API
                    const updateAttributes: any = {
                        authTokenRefreshTime: new Date(),
                        lastActivityTime: new Date()
                    };

                    // Update the authTokenRefreshTime in sessionStorage
                    this.updateSessionInfo(updateAttributes);

                    return true;
                }, () => {
                    this.removeSessionInfo();
                    return false;
                });
            }
        } else {
            this.removeSessionInfo();
            return false;
        }
    }

    public storeSessionInfo(authInfo: any): void {
        const user: User = new User(authInfo);
        const now = new Date();
        const sessionInfo: SessionInfo = new SessionInfo(user, now, now, now);
        this.sessionInfoCache = sessionInfo;
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public updateSessionInfo(updateAttributes: any): void {
        const sessionInfo: SessionInfo = this.getSessionInfo();
        if (updateAttributes.User) {
            sessionInfo.User = updateAttributes.User;
            console.log('User got updated in sessionInfo');
        }

        if (updateAttributes.authTokenRefreshTime) {
            sessionInfo.AuthTokenRefreshTime = updateAttributes.authTokenRefreshTime;
            console.log('authTokenRefreshTime got updated in sessionInfo');
        }

        if (updateAttributes.loggedInTime) {
            sessionInfo.LoggedInTime = updateAttributes.loggedInTime;
            console.log('loggedInTime got updated in sessionInfo');
        }

        if (updateAttributes.lastActivityTime) {
            sessionInfo.LastActivityTime = updateAttributes.lastActivityTime;
            console.log('lastActivityTime got updated in sessionInfo');
        }

        this.sessionInfoCache = sessionInfo;
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public removeSessionInfo(): void {
        sessionStorage.removeItem(SESSION_STORAGE_INFO);
    }

    public parseSessionInfo(sessionInfoString: string): SessionInfo {
        return SessionInfo.parseString(sessionInfoString);
    }

    public getSessionInfo(): SessionInfo {
        if (!this.sessionInfoCache) {
            const sessionInfoString = sessionStorage.getItem(SESSION_STORAGE_INFO);
            const sessionInfo = sessionInfoString ? this.parseSessionInfo(sessionInfoString) : null;
            this.sessionInfoCache = sessionInfo;
        }

        return this.sessionInfoCache;
    }

    public get AuthToken(): string {
        const sessionInfo: SessionInfo = this.getSessionInfo();
        return sessionInfo ? sessionInfo.User.AuthToken : null;
    }

    public get UserId(): number {
        const sessionInfo: SessionInfo = this.getSessionInfo();
        return sessionInfo ? sessionInfo.User.UserId : null;
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

    public authHttpCall(method: string, url: string, data: any, headers: any, isReturnFullResponse: boolean): Observable<any> {
        let retVal: Observable<any> = null;
        headers = headers ? headers : {};
        if (!headers.authToken) {
            headers.authToken = this.AuthToken;
        }

        const options: RequestOptions = new RequestOptions({ headers: headers });

        switch(method.toUpperCase()) {
            case 'GET':
                retVal = this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
                break;
            case 'PUT':
                break;
            case 'POST':
                break;
            case 'DELETE':
                break;
        }
        
        return retVal;
    };
}
