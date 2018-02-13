import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';

import { KFTarcSPSearchComponent } from './components/macro/successprofile/search/kftarc.spsearch.component';

import { KFTarcSuccessprofileService } from './services/kftarc.successprofile.service';
import { KFTarcTalentArchitectConstantsService } from './services/kftarc.talentarchitect-constants.service';
import { KFTarcSandboxesModule } from './sandboxes/kftarc.sandboxes.module';
import { KFTarcSharedModule } from './shared/kftarc.shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DropdownModule,
        MultiSelectModule,
        KFTarcSandboxesModule,
        KFTarcSharedModule
    ],
    declarations: [
        KFTarcSPSearchComponent
    ],
    exports: [
        KFTarcSPSearchComponent
    ],
    providers: [
        KFTarcSuccessprofileService,
        KFTarcTalentArchitectConstantsService
    ]
})
export class KFTarcTalentArchitectModule { }
