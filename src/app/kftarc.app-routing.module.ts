import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KFTarcSandboxMainComponent } from './modules/sandboxes/main/kftarc.sandboxmain.component';
import { KFTarcLoginProxyComponent } from './modules/shared/components/auth/kftarc.loginproxy.component';
import { KFTarcSPSearchComponent } from './modules/components/macro/successprofile/search/kftarc.spsearch.component';
import { KFTarcJDSearchComponent } from './modules/components/macro/jobdescription/search/kftarc.jdsearch.component';

import { KFAuthGuardService as AuthGuard, KFSharedModule  } from 'kfhub_lib';

const routes: Routes = [];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class KFTarcAppRoutingModule {}
