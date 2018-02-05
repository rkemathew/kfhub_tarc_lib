import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

import { LoginInfo } from '../../models/logininfo.model';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/popup.service';
import { AdvGrowlService } from 'primeng-advanced-growl';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.less' ]
})
export class LoginComponent implements OnInit {
    public email: string = null;
    public password: string = null;
    private deploy: string = ''; // HG.DEPLOY;
    private isLoggedIn = false; // sessionStorage.getItem(HG.USERID_KEY) ? true: false;
    private newPassword = null;
    private confirmNewPassword = null;
    private checkedStatus: boolean = false;
    public showForgotPassword: boolean = false;
    private resetPWEmail: string = '';

    constructor(
        private location: Location,
        private translate: TranslateService,
        private authService: AuthService,
        private popupService: PopupService,
        private advGrowlService: AdvGrowlService
    ) {}

    ngOnInit() {}

    login() {
        var loginInfo: LoginInfo = new LoginInfo(this.email, this.password);
        this.authService.login(loginInfo).subscribe((res) => {
            let authInfo: any = res.data;
            this.authService.storeSessionInfo(authInfo);

            const userId = authInfo.userId;
            this.authService.getUser(userId).subscribe((res) => {
                authInfo.firstName = res.data.firstName;
                authInfo.lastName = res.data.lastName;
                authInfo.hasTalentProduct = false;
                authInfo.hasPayProduct = false;
                authInfo.hasTalentAcquisitionProduct = false;
                authInfo.hasPayDataProduct = false;

                res.data.subscriptions[0].productTypes.forEach((productType) => {
                    switch (productType.id) {
                        case 22: authInfo.hasTalentProduct = true; break;
                        case 23: authInfo.hasPayProduct = true; break;
                        case 24: authInfo.hasTalentAcquisitionProduct = true; break;
                        case 25: authInfo.hasPayProduct = true; break;
                    }
                });

                this.authService.storeSessionInfo(authInfo);

                this.advGrowlService.createTimedSuccessMessage('Welcome ' + authInfo.firstName + ' ' + authInfo.lastName, 'Welcome', 3000);
/*
                setTimeout(() => {
                    this.advGrowlService.createWarningMessage('You have been warned', 'Warning Message');
                }, 2000);

                setTimeout(() => {
                    this.advGrowlService.createTimedInfoMessage('This is an informational message', 'Info Message', 10000);
                }, 1000);

                setTimeout(() => {
                    this.advGrowlService.createTimedErrorMessage('This is bad. An Error Occurred. Click me to close', 'Error Message', 0);
                }, 3000);
*/
                this.loginPostProcess(authInfo);
            }, this.handleError);
        }, this.handleError);
    }

    loginPostProcess(authInfo: any) {
        console.log('authInfo', authInfo);
        this.translate.setDefaultLang(authInfo.locale);
        this.translate.use(authInfo.locale);

        let currentDateTime = new Date();
        let currentTimeinSec = currentDateTime.getTime();
        let passwordExpirationDate = new Date(authInfo.passwordExpirationDateTime);
        let numberDays = Math.round((authInfo.passwordExpirationDateTime - currentTimeinSec) / (1000 * 3600 * 24));

        if (currentDateTime > passwordExpirationDate) {
            this.popupService.alert('PasswordExpired', 'PasswordExpires', 'ResetPassword', {})
                .subscribe((response) => {
                    if (response) {
                        this.toggleForgotPassword();
                    }
                }, this.handleError);
        } else if (numberDays == 0) {
            this.popupService.confirm('passwordExpiresToday', 'PasswordExpires', 'Change', 'Cancel', {}, {days: numberDays})
                .subscribe((response) => {
                    if (response) {
                        this.toggleForgotPassword();
                    }
                }, this.handleError);
        } else if (numberDays < 10) {
            this.popupService.confirm('passwordExpiresIn10', 'PasswordExpires', 'Change', 'Cancel', {}, {days: numberDays})
                .subscribe((response) => {
                    if (response) {
                        this.toggleForgotPassword();
                    }
                }, this.handleError);
        } else {
            this.authService.redirect();
        }
    }

    handleError(error) {
        console.log('handleError', error ? error : 'Undefined');
    }

    isShowResetPassword(): boolean {
        return this.location.path().indexOf('reset-password') > -1;
    }

    resetPassword() {
//         if (this.newPassword === this.confirmNewPassword){
//             var data = {
// //                passwordToken: $routeParams.passwordToken,
//                 newPassword: this.newPassword,
//                 retypeNewPassword: this.confirmNewPassword
//             };

//             $http.post(baseUrl + '/actions/resetpassword', data).success(function(data, status, headers, config){
//                 AlertService.clear();
//                 AlertService.setSuccessMessage(data.responseMessage);
//                 setTimeout(function(){
//                     $scope.returnToLogin();
//                 }, 2000);
//             })
//         } else {
// //            AlertService.setError('PasswordsNotMatch');
//         }
    }

    returnToLogin() {
        // this.location.go('successprofile/login');
    }

    toggleForgotPassword() {
        // this.showForgotPassword = !this.showForgotPassword;
        // this.resetPWEmail = '';
    }

    sendResetEmail() {
        // $http.post(this.baseUrl + '/actions/forgotpassword', 
        //     { userName: this.resetPWEmail },
        //     { headers: {'applicationName':'KF_PRODUCTS'} }
        // ).success(function(data, status, headers, config){
        //     AlertService.setSuccessMessage(data.responseMessage);
        // }).error(function (data, status, headers, config) {
        // });
    }
}
