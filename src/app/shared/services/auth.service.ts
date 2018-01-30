import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { SessionInfo } from '../models/sessioninfo.model';

const SESSION_TIMEOUT_IN_MILLIS: number = 1200000; // 20 Minutes
const AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS: number = 900000; // 15 Minutes
const SESSION_STORAGE_INFO: string = 'sessionInfo';

@Injectable()
export class AuthService {
    constructor() {}

    public isAuthenticated(): boolean {
        let retVal: boolean = false;

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
        const now = new Date();
        const sessionInfo: SessionInfo = new SessionInfo(user, now, now, now);
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public removeAuthenticationInfo(): void {
        sessionStorage.removeItem(SESSION_STORAGE_INFO);
    }

    private getSessionInfo(sessionInfoString): SessionInfo {
        return SessionInfo.parseString(sessionInfoString);
    }
}
