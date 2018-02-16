import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFTarcSandboxMainComponent } from './main/kftarc.sandbox-main.component';
import { KFComponentsModule } from 'kfhub_lib';
import { KFTarcComponentsModule } from '../components/kftarc.components.module';
import { KFTarcSPSharedService } from '../services/kftarc.sp-shared.service';
import { KFTarcSPSharedConstantsService } from '../services/kftarc.sp-shared-constants.service';

@NgModule({
    imports: [
        CommonModule,
        KFComponentsModule,
        KFTarcComponentsModule
    ],
    declarations: [
        KFTarcSandboxMainComponent
    ],
    exports: [
        KFTarcSandboxMainComponent
    ],
    entryComponents: [
        KFTarcSandboxMainComponent
    ],
    providers: [
        KFTarcSPSharedService,
        KFTarcSPSharedConstantsService
    ]
})
export class KFTarcSandboxesModule {}
