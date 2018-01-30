import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SharedConstants } from '../modules/shared.constants';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    login() {
        const url: string = SharedConstants.getLoginUrl();
        const body: Object = {
            "username": "eric.johnson@fmcg.com",
            "password": "hay"
        };
        const options: RequestOptionsArgs = {
            headers: new Headers({ "applicationName": SharedConstants.APP_NAME_CORE })
        };
        return this.http.post(url, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }
}