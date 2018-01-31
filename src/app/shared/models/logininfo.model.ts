export class LoginInfo {
    private username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    get Username(): string {
        return this.username;
    }
    
    set Username(value: string) {
        this.username = value;
    }

    get Password(): string {
        return this.password;
    }

    set Password(value: string) {
        this.password = value;
    }
}
