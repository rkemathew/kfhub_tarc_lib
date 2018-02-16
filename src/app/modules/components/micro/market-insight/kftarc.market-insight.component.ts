import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TranslateService } from '@ngx-translate/core';

import { KFTarcMarketInsightRawComponent } from './kftarc.market-insight-raw.component';

import { KFTarcPricedResults } from '../../../models/kftarc.priced-results.model';
import { KFTarcPricedFact } from '../../../models/kftarc.priced-fact.model';

import { KFTarcSPSharedService } from '../../../services/kftarc.sp-shared.service';

import { KFKeyedCollection } from 'kfhub_lib';

@Component({
    selector: 'kftarc-market-insight',
    templateUrl: './kftarc.market-insight-raw.component.html',
    styleUrls: [ './kftarc.market-insight-raw.component.less' ]
})
export class KFTarcMarketInsightComponent extends KFTarcMarketInsightRawComponent implements OnInit {
    pricingCache: KFKeyedCollection<KFTarcPricedFact[]> = new KFKeyedCollection<KFTarcPricedFact[]>();

    @Input() jobRoleTypeId: string;
    @Input() standardHayGrade: number;
    @Input() countryId: number;

    constructor(
        public spSharedService: KFTarcSPSharedService,
        public translate: TranslateService,
        public currencyPipe: CurrencyPipe
    ) {
        super(translate, currencyPipe);
    }

    ngOnInit() {
        this.grade = this.standardHayGrade;

        this.getPricedFacts(this.jobRoleTypeId, this.standardHayGrade, this.countryId)
            .subscribe((pricedFacts: KFTarcPricedFact[]) => {
                this.pricedFacts = pricedFacts; 
                console.log('this.pricedFacts', this.pricedFacts); 
            });
    }

    getPricedFacts(jobRoleTypeId: string, standardHayGrade: number, countryId: number): Observable<KFTarcPricedFact[]> {
        return Observable.create((observer: Observer<KFTarcPricedFact[]>) => {
            const key: string = this.getKey(jobRoleTypeId, standardHayGrade, countryId);
            if (!this.pricingCache.ContainsKey(key)) {
                this.spSharedService.getPricing(jobRoleTypeId, standardHayGrade, countryId)
                    .subscribe((pricedResults: KFTarcPricedResults[]) => {
                        const pricedFacts = this.getRelevantPricedFacts(pricedResults);
                        this.pricingCache.Add(key, pricedFacts);
                        observer.next(pricedFacts);
                        observer.complete();
                    });
            } else {
                observer.next(this.pricingCache.Item(key));
                observer.complete();
            }
        });
    }

    getRelevantPricedFacts(pricedResults): KFTarcPricedFact[] {
        return pricedResults[0].pricedFacts.filter((pricedFact: KFTarcPricedFact) => {
            return pricedFact.displayType.slice(0, 10) === 'PRICE_CARD';
        })
    }

    getKey(jobRoleTypeId: string, standardHayGrade: number, countryId: number): string {
        return '' + jobRoleTypeId + '_' + standardHayGrade + '_' + countryId;
    }
}
