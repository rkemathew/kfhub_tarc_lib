import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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