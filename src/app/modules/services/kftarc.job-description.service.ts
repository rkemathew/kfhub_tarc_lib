import { Injectable } from '@angular/core';
import { KFTarcSuccessprofileService } from './kftarc.success-profile.service';
import { KFTarcTalentArchitectConstantsService } from './kftarc.talent-architect-constants.service';
import { KFAuthService } from 'kfhub_lib';

@Injectable()
export class KFTarcJobDescriptionService extends KFTarcSuccessprofileService {
    constructor(
        public authService: KFAuthService,
        public talentArchitectConstants: KFTarcTalentArchitectConstantsService
    ) {
        super(authService, talentArchitectConstants);
    }

    getSearchUrl(): string {
        return this.talentArchitectConstants.getJobDescriptionsUrl();
    }
}
