import { Injectable } from '@angular/core';
import { Route  } from '@angular/router';

import { KFTarcSPSearchComponent } from '../../components/macro/successprofile/search/kftarc.spsearch.component';
import { KFTarcJDSearchComponent } from '../../components/macro/jobdescription/search/kftarc.jdsearch.component';

const routes: Route[] = [
    { path: 'tarc/sp/search', component: KFTarcSPSearchComponent },
    { path: 'tarc/jd/search', component: KFTarcJDSearchComponent },
];

@Injectable()
export class KFTarcRoutesService {
    getRoutes(): Route[] {
        return routes;
    }
}
