import { Component } from '@angular/core';
import { KFTarcPricedFact } from '../../models/kftarc.priced-fact.model';
import { KFTarcCurrency } from '../../models/kftarc.currency.model';

@Component({
    selector: 'kftarc-sandbox-main',
    templateUrl: './kftarc.sandbox-main.component.html',
    styleUrls: [ './kftarc.sandbox-main.component.less' ]
})
export class KFTarcSandboxMainComponent {
    currency: KFTarcCurrency = { currencyIsoCode: 'USD' };

    pricedFacts: KFTarcPricedFact[] = [
        { factId: 1, factName: 'Total Cash', marketLow: 32594, marketHigh: 45401, order: 1},
        { factId: 2, factName: 'Base Salary', marketLow: 32240, marketHigh: 43770, order: 2}
    ]
}
