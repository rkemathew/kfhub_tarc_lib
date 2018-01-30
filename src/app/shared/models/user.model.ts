export class User {
    private userId: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private clientId: number;
    private authToken: string;
    private locale: string;

    constructor(data: any) {
        this.userId = data && data.userId ? data.userId : null;
        this.username = data && data.username ? data.username : null;
        this.firstName = data && data.firstName ? data.firstName : null;
        this.lastName = data && data.lastName ? data.lastName : null;
        this.clientId = data && data.clientId ? data.clientId : null;
        this.authToken = data && data.authToken ? data.authToken : null;
        this.locale = data && data.locale ? data.locale : null;
    }
}
