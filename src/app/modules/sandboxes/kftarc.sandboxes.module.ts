import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFTarcSandboxMainComponent } from './main/kftarc.sandbox-main.component';
import { KFComponentsModule } from 'kfhub_lib';

@NgModule({
    imports: [
        CommonModule,
        KFComponentsModule
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
    providers: []
})
export class KFTarcSandboxesModule {}
