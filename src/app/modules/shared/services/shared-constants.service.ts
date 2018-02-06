import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SharedConstantsService {
    public APP_NAME_CORE = 'PRODUCTS_HUB';
    public API_VERSION = '/v1';
    public LOGIN_URL = '/actions/login';
    public USERS_URL = '/users'

    public getBaseApiUrl() {
        return environment().baseApiUrl;
    }

    public getApiVersion() {
        return this.API_VERSION;
    }

    public getAPIUrl(apiUrl: string, params: any = null) {
        let retVal = this.getBaseApiUrl() + this.getApiVersion() + apiUrl;
        if (params) {
            retVal += '?';
            Object.keys(params).forEach((key) => {
                retVal += key + '=' + params[key] + '&';
            });
            retVal = retVal.slice(0, -1);
        }
        return encodeURI(retVal);
    }

    public getLoginUrl() {
        return this.getBaseApiUrl() + this.getApiVersion() +
            this.LOGIN_URL;
    }

    public getUsersUrl(userId: number = null) {
        return this.getBaseApiUrl() + this.getApiVersion() +
            this.USERS_URL +(userId ? '/' + userId : '');
    }
}
