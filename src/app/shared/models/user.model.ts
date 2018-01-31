export class User {
    private userId: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private clientId: number;
    private authToken: string;
    private locale: string;
    private hasTalentProduct: boolean;
    private hasPayProduct: boolean;
    private hasTalentAcquisitionProduct: boolean;
    private hasPayDataProduct: boolean;

    constructor(data: any) {
        this.userId = data && data.userId ? data.userId : null;
        this.username = data && data.username ? data.username : null;
        this.firstName = data && data.firstName ? data.firstName : null;
        this.lastName = data && data.lastName ? data.lastName : null;
        this.clientId = data && data.clientId ? data.clientId : null;
        this.authToken = data && data.authToken ? data.authToken : null;
        this.locale = data && data.locale ? data.locale : null;
        this.hasTalentProduct = data && data.hasPayProduct ? data.hasPayProduct : null;
        this.hasPayProduct = data && data.hasPayProduct ? data.hasPayProduct : null;
        this.hasTalentAcquisitionProduct = data && data.hasTalentAcquisitionProduct ? data.hasTalentAcquisitionProduct : null;
        this.hasPayDataProduct = data && data.hasPayDataProduct ? data.hasPayDataProduct : null;
    }

    public get UserId(): number {
        return this.userId;
    }

    public get Username(): string {
        return this.username;
    }

    public get FirstName(): string {
        return this.firstName;
    }

    public get LastName(): string {
        return this.lastName;
    }
    
    public get ClientId(): number {
        return this.clientId;
    }

    public get AuthToken(): string {
        return this.authToken;
    }

    public get Locale(): string {
        return this.locale;
    }

    public get HasTalentProduct(): boolean {
        return this.hasTalentProduct;
    }

    public get HasPayProduct(): boolean {
        return this.hasPayProduct;
    }

    public get HasTalentAcquisitionProduct(): boolean {
        return this.hasTalentAcquisitionProduct;
    }

    public get HasPayDataProduct(): boolean {
        return this.HasPayDataProduct;
    }
}
