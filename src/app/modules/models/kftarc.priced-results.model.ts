import { KFTarcCurrency} from './kftarc.currency.model';
import { KFTarcPricedFact } from './kftarc.priced-fact.model';

export interface KFTarcPricedResults {
    locationId: number,
    locationName: string,
    numberOfParticipants: number,
    currency: KFTarcCurrency,
    pricedFacts: KFTarcPricedFact[]
}
