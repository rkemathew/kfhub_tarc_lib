import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SuccessprofileService } from './services/successprofile.service';
import { TalentArchitectConstantsService } from './services/talentarchitect-constants.service';
import { SPSearchComponent } from './successprofile/spsearch.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SPSearchComponent
    ],
    providers: [
        SuccessprofileService,
        TalentArchitectConstantsService
    ]
})
export class TalentArchitectModule { }
