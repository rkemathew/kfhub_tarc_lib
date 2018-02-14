import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';

import { KFRoutesService, KFAuthService, KFUtilsService, KFMenuItem } from 'kfhub_lib';
import { KFTarcRoutesService } from './modules/shared/services/kftarc.routes.service';
import { KFTarcSandboxMainComponent } from './modules/sandboxes/main/kftarc.sandboxmain.component';

const INITIAL_ROUTE_PATH: string = 'tarc/sp/search';
const DEFAULT_ROUTE_PATH: string = 'login';

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
        private utilsService: KFUtilsService,
        private kfRoutesService: KFRoutesService,
        private kftarcRoutesService: KFTarcRoutesService
    ){};

    ngOnInit() {
        this.menuItems = this.getMenuItems();
        this.router.resetConfig(this.getRoutes());
    }

    getMenuItems(): KFMenuItem[] {
        const pmSubMenuSP = new KFMenuItem('BCSuccessProfiles', 'tarc/sp/search');
        const pmSubMenuJD = new KFMenuItem('JobDescriptionsPageTitle', 'tarc/jd/search');
        const pmMainMenu = new KFMenuItem('Talent', 'tarc/sp/search', [ pmSubMenuSP, pmSubMenuJD ]);

        const taSubMenuAP = new KFMenuItem('Assessment Projects', 'tacq/ap/projsearch');
        const taMainMenu = new KFMenuItem('TalentAcquisition', 'tacq/ap/projsearch', [ taSubMenuAP ]);

        const opSubMenuPay = new KFMenuItem('Pay', 'orgp/pay/new');
        const opSubMenuOrgSetup = new KFMenuItem('Organization Setup', 'orgp/orgsetup/leaderboard');
        const opSubMenuOrgSurveys = new KFMenuItem('Organization Surveys', 'orgp/orgsurvey/surveyslist');
        const opMainMenu = new KFMenuItem('OrganizationPerformance', 'orgp/pay/new', [ opSubMenuPay, opSubMenuOrgSetup, opSubMenuOrgSurveys ]);

        return [ pmMainMenu, taMainMenu, opMainMenu ];
    }

    getRoutes(): Route[] {
        let routes: Route[] = [];
        routes.push(this.getInitialRoute());
        routes.push.apply(routes, this.getKFRoutes());
        routes.push.apply(routes, this.getKFTarcRoutes());
        routes.push(this.getDefaultRoute());

        console.log(routes);

        return routes;
    }

    getInitialRoute(): Route {
        return { path: '', redirectTo: INITIAL_ROUTE_PATH, pathMatch: 'full' };
    }

    getDefaultRoute(): Route {
        return { path: '**', redirectTo: DEFAULT_ROUTE_PATH, pathMatch: 'full' };
    }

    getKFRoutes(): Route[] {
        return this.kfRoutesService.getRoutes();
    }

    getKFTarcRoutes(): Route[] {
        let routes: Route[] = [
            { path: 'sandboxmain', component: KFTarcSandboxMainComponent }
        ];

        const kftarcRoutes: Route[] = this.kftarcRoutesService.getRoutes();
        routes.push.apply(routes, kftarcRoutes);
        return routes;
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
