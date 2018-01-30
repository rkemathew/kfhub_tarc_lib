import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

const SESSION_TIMEOUT_IN_MILLIS: number = 1200000; // 20 Minutes
const AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS: number = 900000; // 15 Minutes
const SESSION_STORAGE_LOGGED_IN_USER: string = 'loggedInUser';

@Injectable()
export class AuthService {
    constructor() {}

    public isAuthenticated(): boolean {
        let retVal: boolean = false;

        const sessionInfoString = sessionStorage.getItem('sessionInfo');
        const sessionInfo = sessionInfoString ? JSON.parse(sessionInfoString) : null;
        const authToken = sessionInfo ? sessionInfo.authToken : null;
        const authTokenRefreshTime = sessionInfo ? sessionInfo.authTokenRefreshTime : null;
        const loggedInTime = sessionInfo ? sessionInfo.loggedInTime : null;
        const lastActivityTime = sessionInfo ? sessionInfo.lastActivityTime : null;

        const now = new Date().getTime();
        const lastActivityElapsedTime = now - lastActivityTime;
        const authTokenElapsedTime = now - authTokenRefreshTime;
        
        if (lastActivityElapsedTime < SESSION_TIMEOUT_IN_MILLIS) {
            if (authTokenElapsedTime < AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS) {
                retVal = true;
            } else {
                // Re-validate the AuthToken by issuing a call to UserInfo to ensure that the authToken is still valid
                // Update the authTokenRefreshTime in sessionStorage
            }
        } else {
            retVal = false;
        }

        return retVal;
    }

    public storeAuthenticationInfo(authInfo: any): void {
        const user: User = new User(authInfo);
        sessionStorage.setItem(SESSION_STORAGE_LOGGED_IN_USER, JSON.stringify(user));
    }
}
