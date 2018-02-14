import { Injectable } from '@angular/core';
import { KFTarcSuccessprofileService } from './kftarc.successprofile.service';
import { KFTarcTalentArchitectConstantsService } from './kftarc.talentarchitect-constants.service';
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
