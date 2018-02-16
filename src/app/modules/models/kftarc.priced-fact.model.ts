export interface KFTarcPricedFact {
    factId: number,
    factName: string,
    marketLow: number,
    marketHigh: number,
    factMedian?: number,
    displayType?: string,
    displayTypeId?: number,
    order: number
}
