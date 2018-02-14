import { Injectable } from '@angular/core';
import { Route  } from '@angular/router';

import { KFTarcSPSearchComponent } from '../../components/macro/successprofile/search/kftarc.spsearch.component';
import { KFTarcJDSearchComponent } from '../../components/macro/jobdescription/search/kftarc.jdsearch.component';
import { KFAuthGuardService as AuthGuard } from 'kfhub_lib';

const routes: Route[] = [
    { path: 'tarc/sp/search', component: KFTarcSPSearchComponent, canActivate: [ AuthGuard ] },
    { path: 'tarc/jd/search', component: KFTarcJDSearchComponent, canActivate: [ AuthGuard ] },
];

@Injectable()
export class KFTarcRoutesService {
    getRoutes(): Route[] {
        return routes;
    }
}
