import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { KFAuthService } from 'kfhub_lib';
import { KFTarcPricedResults } from '../models/kftarc.priced-results.model';
import { KFTarcSPSharedConstantsService } from './kftarc.sp-shared-constants.service';

@Injectable()
export class KFTarcSPSharedService {
    constructor(
        public authService: KFAuthService,
        public spSharedConstants: KFTarcSPSharedConstantsService
    ) {}

    getPricing(jobRoleTypeId: string, standardHayGrade: number, countryId: number): Observable<KFTarcPricedResults[]> {
        let url = this.spSharedConstants.getPricingUrl(jobRoleTypeId, standardHayGrade, countryId);
        return this.authService.authHttpCall('GET', url, null, {})
            .map((results: any) => results.pricedResults);
    }
}
