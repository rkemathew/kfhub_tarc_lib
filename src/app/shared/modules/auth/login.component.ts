import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { SharedConstants } from '../shared.constants';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.less' ],
    providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
    private deploy: string = ''; // HG.DEPLOY;
    private isLoggedIn = false; // sessionStorage.getItem(HG.USERID_KEY) ? true: false;
    private newPassword = null;
    private confirmNewPassword = null;
    private email: string = null;
    private password: string = null;
    private checkedStatus: boolean = false;
    private showForgotPassword: boolean = false;
    private resetPWEmail: string = '';
    private baseUrl: string = SharedConstants.BASE_API_URL + SharedConstants.API_VERSION;

    constructor(
        private location: Location,
        private modal: Modal,
        private loginService: LoginService
    ) {}

    ngOnInit() {}

/*
    $('.main-column').addClass('login');
    $('body').addClass('login');
    $('.header-bar').addClass('hide');
    $('.navbar-nav').addClass('hide');
*/

//    $scope.alertService = AlertService;

    showResetPassword() {
        return this.location.path().indexOf('reset-password') > -1;
    }

    resetPassword() {
        if (this.newPassword === this.confirmNewPassword){
            var data = {
//                passwordToken: $routeParams.passwordToken,
                newPassword: this.newPassword,
                retypeNewPassword: this.confirmNewPassword
            };

            // $http.post(baseUrl + '/actions/resetpassword', data).success(function(data, status, headers, config){
            //     AlertService.clear();
            //     AlertService.setSuccessMessage(data.responseMessage);
            //     setTimeout(function(){
            //         $scope.returnToLogin();
            //     }, 2000);
            // })
        } else {
//            AlertService.setError('PasswordsNotMatch');
        }
    }

    returnToLogin() {
        this.location.go('successprofile/login');
    }

    login() {
        var data = {
            username: this.email,
            password: this.password,
            checkedStatus: this.checkedStatus
        };

        this.loginService.login().subscribe((res) => {
        // $http.post(this.baseUrl + '/actions/login', data, { headers: { applicationName: 'PRODUCTS_HUB' } }).success(function (data, status, headers, config) {
            // $translate.use(data.data.locale).then(function () {
            //     AuthService.defaultLanguage($translate.use());
            // }, function () {
            //     AuthService.defaultLanguage($translate.use());
            // });

            let currentDateTime = new Date();
            let currentTimeinSec = currentDateTime.getTime();
            let passwordExpirationDate = new Date(res.data.passwordExpirationDateTime);
            let numberDays = Math.round((res.data.passwordExpirationDateTime - currentTimeinSec) / (1000 * 3600 * 24));

            this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('PasswordExpires')
            .body('PasswordExpired')
            .okBtn('ResetPassword')
            .open()
            .then((dialogRef) => {
                dialogRef.result.then((result) => alert('The result is: {{ result }}'));
            });

            alert('This is a test');

            if (currentDateTime > passwordExpirationDate) {
                // const dialogRef = this.modal.alert()
                // .size('lg')
                // .showClose(true)
                // .title('PasswordExpires')
                // .body('PasswordExpired')
                // .okBtn('ResetPassword')
                // .open();

                // dialogRef.then((dialogRef) => {
                //     dialogRef.result.then((result) => alert('The result is: ${result}'));
                // });

                // alert('This is a test');
/*
                $popup.alert('PasswordExpired', 'PasswordExpires', 'ResetPassword').then(function(response) {
                    if (response === 'Yes'){
                        this.toggleForgotPassword();
                    }
                });
*/
            } /* else if (numberDays == 0) {
                $popup.confirm('passwordExpiresToday', 'PasswordExpires', 'Change', 'Cancel',{}, {days: numberDays}).then(function(response){
                    if (response === 'Yes') {
                        $scope.toggleForgotPassword();
                    } else {
                        AuthService.token(data.data.authToken);
                        AuthService.userId(data.data.userId);
                        AuthService.clientId(data.data.clientId);

                        AuthService.username(data.data.username);
                        AuthService.locale(data.data.locale);
                        sessionStorage.setItem("loggedInUser", JSON.stringify(data.data));

                        this.loginCallback(data.data.userId);
                        // $('.main-column').removeClass('login');
                        // $('body').removeClass('login');
                        // $('.header-bar').removeClass('hide');
                        // $('.navbar-nav').removeClass('hide');
                    }
                });
            } else if (numberDays < 10) {
                $popup.confirm('PasswordExpiresIn10', 'PasswordExpires', 'Change', 'Cancel',{}, {days: numberDays}).then(function(response){
                    if (response === 'Yes') {
                        $scope.toggleForgotPassword();
                    } else {
                        AuthService.token(data.data.authToken);
                        AuthService.userId(data.data.userId);
                        AuthService.clientId(data.data.clientId);

                        AuthService.username(data.data.username);
                        AuthService.locale(data.data.locale);
                        sessionStorage.setItem("loggedInUser", JSON.stringify(data.data));

                        this.loginCallback(data.data.userId);
                        // $('.main-column').removeClass('login');
                        // $('body').removeClass('login');
                        // $('.header-bar').removeClass('hide');
                        // $('.navbar-nav').removeClass('hide');
                    }
                });
            } else {
                AuthService.token(data.data.authToken);
                AuthService.userId(data.data.userId);
                AuthService.clientId(data.data.clientId);

                AuthService.username(data.data.username);
                AuthService.locale(data.data.locale);
                sessionStorage.setItem("loggedInUser", JSON.stringify(data.data));

                this.loginCallback(data.data.userId);

                // $('.main-column').removeClass('login');
                // $('body').removeClass('login');
                // $('.header-bar').removeClass('hide');
                // $('.navbar-nav').removeClass('hide');
            }
*/
        });
/*
        .error(function (data, status, headers, config) {
//            utilService.log('login error');
        });
*/
    };

    toggleForgotPassword() {
        this.showForgotPassword = !this.showForgotPassword;
        this.resetPWEmail = '';
    }

    sendResetEmail() {
/*
        $http.post(this.baseUrl + '/actions/forgotpassword', 
            { userName: this.resetPWEmail },
            { headers: {'applicationName':'KF_PRODUCTS'} }
        ).success(function(data, status, headers, config){
            AlertService.setSuccessMessage(data.responseMessage);
        }).error(function (data, status, headers, config) {
        });
*/
    }

    loginCallback(userId) {
/*        
        SPUserService.getUser(userId).then(function(res) {
            AuthService.isAdmin(!!(res.roles && res.roles.length));

            if (res.subscriptions && res.subscriptions[0] && res.subscriptions[0].productTypes) {
                SPUserService.products(res.subscriptions[0].productTypes);

                var talentProduct = _.find(SPUserService.products(), function(p){ return p.id === 22; });
                var payProduct = _.find(SPUserService.products(), function(p){ return p.id === 23; });
                var talentAcqusitionProduct = _.find(SPUserService.products(), function(p){ return p.id === 24; });
                var payData = _.find(SPUserService.products(), function(p){ return p.id === 25; }); // GS TODO doesnt' look like we have product with id 25
                var path= '';
                var paramObj = this.location.search();

                if (paramObj.redirecturl && paramObj.redirecturl !== '/successprofile/login') {
                    this.location.path(paramObj.redirecturl);
                    // $rootScope.isLogin = false;
                } else if (talentProduct && talentProduct.access) {
                    this.location.path('/talentarchitect/spsearch');
                    // $rootScope.isLogin = false;
                } else if (payProduct && payProduct.access) {
                    PayService.getCountriesWithData().then(function(response) {
                        var powerBIDashboardEnabledClients = response.data.powerBIDashboardEnabledClients.split('|');
                        var subscribedToNewPay = powerBIDashboardEnabledClients.indexOf(AuthService.clientId().toString()) > -1;
                        this.location.path(subscribedToNewPay ? 'pay/new' : 'pay/paydashboard');
                        // $rootScope.isLogin = false;
                    });
                } else if (payData && payData.access) {
                    this.location.path('/organizationperformance/dataleaderboard');
                    // $rootScope.isLogin = false;
                } else if (talentAcqusitionProduct && talentAcqusitionProduct.access) {
                    this.location.path('/talentacquisition/tacqprojectsearch');
                    // $rootScope.isLogin = false;
                } else {
                    AlertService.setError('NoPermission');
                    AuthService.clearToken();
                }

                if (path) {
                    if (paramObj.redirecturl) {
                        this.location.path(paramObj.redirecturl);
                    } else {
                        this.location.path(path);
                    }
                }
            }
        });
*/
    }
}
