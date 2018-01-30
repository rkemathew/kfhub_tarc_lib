export class SharedConstants {
    public static BASE_API_URL = 'https://testproducts.kornferry.com';
    public static API_VERSION = '/v1';
    public static LOGIN_URL = '/actions/login';
    public static APP_NAME_CORE = 'PRODUCTS_HUB';

    public static getLoginUrl() {
        return SharedConstants.BASE_API_URL + SharedConstants.API_VERSION + SharedConstants.LOGIN_URL;
    }
}
