import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/oeprator/map';
import 'rxjs/add/oeprator/catch';

@Injectable()
export class ProjectService {
    constructor(private http: Http) {}

    getAssessmentSubscriptions() {
        let url = '';
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }
}