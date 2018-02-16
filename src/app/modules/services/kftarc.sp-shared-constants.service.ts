import { Injectable } from '@angular/core';
import { KFTarcSharedConstantsService } from '../shared/services/kftarc.shared-constants.service';

@Injectable()
export class KFTarcSPSharedConstantsService extends KFTarcSharedConstantsService {
    public API_VERSION = '/v1/actions';
    public PRICING_URL = '/pricedresults';

    public getApiVersion() {
        return this.API_VERSION;
    }

    public getPricingUrl(jobRoleTypeId: string, standardHayGrade: number, countryId: number) {
        return this.getAPIUrl(this.PRICING_URL) + '?jobRoleTypeId=' + jobRoleTypeId +
            '&standardHayGrade=' + standardHayGrade + '&countryId=' + countryId;
    }
}
