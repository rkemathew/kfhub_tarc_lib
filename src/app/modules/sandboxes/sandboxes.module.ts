import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxMainComponent } from './main/sanboxmain.component';
import { KFComponentsModule } from 'kfhub_lib';

@NgModule({
    imports: [
        CommonModule,
        KFComponentsModule
    ],
    declarations: [
        SandboxMainComponent
    ],
    exports: [
        SandboxMainComponent
    ],
    providers: []
})
export class SandboxesModule {}
