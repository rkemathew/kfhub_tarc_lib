import { Injectable } from '@angular/core';
import { KFTarcSharedConstantsService } from '../shared/services/kftarc.shared-constants.service';

@Injectable()
export class KFTarcTalentArchitectConstantsService extends KFTarcSharedConstantsService {
    public API_VERSION = '/v1/hrms';
    public SUBSCRIPTIONS_URL = '/assessments/subscriptions';
    public SUCCESSPROFILES_URL= '/successprofiles';
    public SUCCESSPROFILE_SEARCH_TYPE = 'SEARCH_SUCCESS_PROFILES';
    public JOBDESCRIPTION_SEARCH_TYPE = 'SEARCH_JOBS_MY_DESCRIPTIONS';

    public getApiVersion() {
        return this.API_VERSION;
    }

    public getAssessmentsSubscriptionsUrl() {
        return this.getAPIUrl(this.SUBSCRIPTIONS_URL);
    }

    public getSuccessprofilesBaseUrl() {
        return this.getAPIUrl(this.SUCCESSPROFILES_URL);
    }

    public getSuccessprofilesUrl() {
        return this.getAPIUrl(this.SUCCESSPROFILES_URL) + '/?type=' + this.SUCCESSPROFILE_SEARCH_TYPE;
    }

    public getJobDescriptionsUrl() {
        return this.getAPIUrl(this.SUCCESSPROFILES_URL) + '/?type=' + this.JOBDESCRIPTION_SEARCH_TYPE;
    }
}
