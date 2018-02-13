import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFTarcSandboxMainComponent } from './main/kftarc.sandboxmain.component';
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
    providers: []
})
export class KFTarcSandboxesModule {}
