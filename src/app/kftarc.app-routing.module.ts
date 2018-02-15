import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KFTarcSandboxMainComponent } from './modules/sandboxes/main/kftarc.sandbox-main.component';
import { KFTarcSPSearchComponent } from './modules/components/macro/success-profile/search/kftarc.sp-search.component';
import { KFTarcJDSearchComponent } from './modules/components/macro/job-description/search/kftarc.jd-search.component';

import { KFAuthGuardService as AuthGuard, KFSharedModule  } from 'kfhub_lib';

const routes: Routes = [];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class KFTarcAppRoutingModule {}
