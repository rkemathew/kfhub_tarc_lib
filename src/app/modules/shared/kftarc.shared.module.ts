import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFTarcLoginProxyComponent } from './components/auth/kftarc.loginproxy.component';
import { SharedModule } from 'kfhub_lib';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        KFTarcLoginProxyComponent
    ]
})
export class KFTarcSharedModule {}
