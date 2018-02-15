import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';

import { KFTarcSPSearchComponent } from './components/macro/success-profile/search/kftarc.sp-search.component';
import { KFTarcJDSearchComponent } from './components/macro/job-description/search/kftarc.jd-search.component';

import { KFTarcSuccessprofileService } from './services/kftarc.success-profile.service';
import { KFTarcJobDescriptionService } from './services/kftarc.job-description.service';
import { KFTarcTalentArchitectConstantsService } from './services/kftarc.talent-architect-constants.service';
import { KFTarcRoutesService } from './shared/services/kftarc.routes.service';

import { KFTarcSandboxesModule } from './sandboxes/kftarc.sandboxes.module';
import { KFTarcSharedModule } from './shared/kftarc.shared.module';
import { KFAuthGuardService } from 'kfhub_lib';

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
        KFTarcSPSearchComponent,
        KFTarcJDSearchComponent
    ],
    exports: [
        KFTarcSPSearchComponent,
        KFTarcJDSearchComponent
    ],
    entryComponents: [
        KFTarcSPSearchComponent,
        KFTarcJDSearchComponent
    ],
    providers: [
        KFTarcRoutesService,
        KFTarcTalentArchitectConstantsService,
        KFAuthGuardService,
        KFTarcSuccessprofileService,
        KFTarcJobDescriptionService,
    ]
})
export class KFTarcTalentArchitectModule { }
