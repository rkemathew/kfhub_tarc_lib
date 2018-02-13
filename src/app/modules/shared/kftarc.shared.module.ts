import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFTarcLoginProxyComponent } from './components/auth/kftarc.loginproxy.component';
import { KFSharedModule } from 'kfhub_lib';

@NgModule({
    imports: [
        CommonModule,
        KFSharedModule
    ],
    declarations: [
        KFTarcLoginProxyComponent
    ]
})
export class KFTarcSharedModule {}
