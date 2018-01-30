import { User } from './user.model';

export class SessionInfo {
    private user: User;
    private authTokenRefreshTime: number;
    private loggedInTime: number;
    private lastActivityTime: number;

    constructor(user: User, authTokenRefreshTime: Date, loggedInTime: Date, lastActivityTime: Date) {
        this.user = user;
        this.authTokenRefreshTime = authTokenRefreshTime ? authTokenRefreshTime.getTime() : null;
        this.loggedInTime = loggedInTime ? loggedInTime.getTime() : null;
        this.lastActivityTime = lastActivityTime ? lastActivityTime.getTime() : null;
    }

    public static parseString(sessionInfoString): SessionInfo {
        let sessionInfo: SessionInfo = new SessionInfo(null, null, null, null);

        try {
            let sessionInfoParsed: any = JSON.parse(sessionInfoString);
            sessionInfo.user = new User(sessionInfoParsed.user);
            sessionInfo.authTokenRefreshTime = sessionInfoParsed.authTokenRefreshTime;
            sessionInfo.loggedInTime = sessionInfoParsed.loggedInTime;
            sessionInfo.lastActivityTime = sessionInfoParsed.lastActivityTime;
        } catch(e) {
        }

        return sessionInfo;
    }

    get User(): User {
        return this.user;
    }

    set User(value: User) {
        this.user = value;
    }

    get AuthTokenRefreshTime(): Date {
        return new Date(this.authTokenRefreshTime);
    }

    set AuthTokenRefreshTime(value: Date) {
        this.authTokenRefreshTime = value.getTime();
    }

    get LoggedInTime(): Date {
        return new Date(this.loggedInTime);
    }

    set LoggedInTime(value: Date) {
        this.loggedInTime = value.getTime();
    }

    get LastActivityTime(): Date {
        return new Date(this.lastActivityTime);
    }

    set LastActivityTime(value: Date) {
        this.lastActivityTime = value.getTime();
    }
}
