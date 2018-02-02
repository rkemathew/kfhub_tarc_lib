import { environment } from '../../../environments/environment';

export class SharedConstants {
    public static APP_NAME_CORE = 'PRODUCTS_HUB';
    public static API_VERSION = '/v1';
    public static LOGIN_URL = '/actions/login';
    public static USERS_URL = '/users'

    public static getLoginUrl() {
        return environment().baseApiUrl + SharedConstants.API_VERSION + SharedConstants.LOGIN_URL;
    }

    public static getUsersUrl(userId: number = null) {
        return environment().baseApiUrl + SharedConstants.API_VERSION + SharedConstants.USERS_URL +(userId ? '/' + userId : '');
    }
}
