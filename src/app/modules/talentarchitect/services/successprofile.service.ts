import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from 'kfhub_lib';
import { TalentArchitectConstantsService } from './talentarchitect-constants.service';

@Injectable()
export class SuccessprofileService {
    constructor(
        private authService: AuthService,
        private talentArchitectConstants: TalentArchitectConstantsService
    ) {}

    getAssessmentSubscriptions(): Observable<any> {
        let url = this.talentArchitectConstants.getAssessmentsSubscriptionsUrl();
        return this.authService.authHttpCall('GET', url, null, { applicationName: 'TALENT_ACQUISITION' });
    }
}
