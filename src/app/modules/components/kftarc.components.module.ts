import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { KFTarcMarketInsightRawComponent } from './micro/market-insight/kftarc.market-insight-raw.component';
import { KFTarcMarketInsightComponent } from './micro/market-insight/kftarc.market-insight.component';
import { KFComponentsModule } from 'kfhub_lib';

@NgModule({
    imports: [
        CommonModule,
        KFComponentsModule
    ],
    declarations: [
        KFTarcMarketInsightRawComponent,
        KFTarcMarketInsightComponent
    ],
    exports: [
        KFTarcMarketInsightRawComponent,
        KFTarcMarketInsightComponent
    ],
    entryComponents: [
        KFTarcMarketInsightRawComponent,
        KFTarcMarketInsightComponent
    ],
    providers: [
        CurrencyPipe
    ]
})
export class KFTarcComponentsModule {}
