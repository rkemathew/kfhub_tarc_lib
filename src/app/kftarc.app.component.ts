import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';

import { KFAuthService, KFUtilsService } from 'kfhub_lib';

@Component({
    selector: 'kftarc-root',
    templateUrl: 'kftarc.app.component.html',
    styleUrls: [ 'kftarc.app.component.less' ]
})
export class KFTarcAppComponent {
    public spinkit = Spinkit;
    
    constructor(
        private router: Router,
        private authService: KFAuthService,
        private utilsService: KFUtilsService
    ){};

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }

    onLogout(event) {
        console.log('In onLogout event handler in App Component');
        this.authService.removeSessionInfo();
        this.router.navigate(['/login']);
    }
}
