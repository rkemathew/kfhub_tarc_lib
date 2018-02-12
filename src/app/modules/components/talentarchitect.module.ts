import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';

import { SPSearchComponent } from './coarse/successprofile/search/spsearch.component';

import { SuccessprofileService } from '../services/successprofile.service';
import { TalentArchitectConstantsService } from '../services/talentarchitect-constants.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DropdownModule,
        MultiSelectModule
    ],
    declarations: [
        SPSearchComponent
    ],
    exports: [
        SPSearchComponent
    ],
    providers: [
        SuccessprofileService,
        TalentArchitectConstantsService
    ]
})
export class TalentArchitectModule { }
