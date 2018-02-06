import { Injectable } from '@angular/core';
import { SharedConstantsService } from '../../../modules/shared/services/shared-constants.service';

@Injectable()
export class TalentArchitectConstantsService extends SharedConstantsService {
    public SUBSCRIPTION_URL = '/subscriptions';

    public getAssessmentsSubscriptionsUrl() {
        return this.getAPIUrl(this.SUBSCRIPTION_URL);
    }
}
