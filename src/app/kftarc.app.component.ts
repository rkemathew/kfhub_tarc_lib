import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';

import { KFAuthService, KFUtilsService, KFMenuItem } from 'kfhub_lib';

@Component({
    selector: 'kftarc-root',
    templateUrl: 'kftarc.app.component.html',
    styleUrls: [ 'kftarc.app.component.less' ]
})
export class KFTarcAppComponent implements OnInit {
    public spinkit = Spinkit;
    menuItems: KFMenuItem[] = null;
    
    constructor(
        private router: Router,
        private authService: KFAuthService,
        private utilsService: KFUtilsService
    ){};

    ngOnInit() {
        const pmSubMenuSP = new KFMenuItem('BCSuccessProfiles', 'tarc/sp/search');
        const pmSubMenuJD = new KFMenuItem('JobDescriptionsPageTitle', 'tarc/jd/search');
        const pmMainMenu = new KFMenuItem('Talent', 'tarc/sp/search', [ pmSubMenuSP, pmSubMenuJD ]);

        const taSubMenuAP = new KFMenuItem('Assessment Projects', 'tacq/ap/projsearch');
        const taMainMenu = new KFMenuItem('TalentAcquisition', 'tacq/ap/projsearch', [ taSubMenuAP ]);

        const opSubMenuPay = new KFMenuItem('Pay', 'orgp/pay/new');
        const opSubMenuOrgSetup = new KFMenuItem('Organization Setup', 'orgp/orgsetup/leaderboard');
        const opSubMenuOrgSurveys = new KFMenuItem('Organization Surveys', 'orgp/orgsurvey/surveyslist');
        const opMainMenu = new KFMenuItem('OrganizationPerformance', 'orgp/pay/new', [ opSubMenuPay, opSubMenuOrgSetup, opSubMenuOrgSurveys ]);

        const menuItems = [ pmMainMenu, taMainMenu, opMainMenu ];
        this.menuItems = menuItems;
    }

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }

    onLogout(event) {
        console.log('In onLogout event handler in App Component');
        this.authService.removeSessionInfo();
        this.router.navigate(['/login']);
    }
}
