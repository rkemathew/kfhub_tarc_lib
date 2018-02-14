import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KFTarcSandboxMainComponent } from './modules/sandboxes/main/kftarc.sandboxmain.component';
import { KFTarcLoginProxyComponent } from './modules/shared/components/auth/kftarc.loginproxy.component';
import { KFTarcSPSearchComponent } from './modules/components/macro/successprofile/search/kftarc.spsearch.component';
import { KFTarcJDSearchComponent } from './modules/components/macro/jobdescription/search/kftarc.jdsearch.component';

import { KFAuthGuardService as AuthGuard, KFSharedModule  } from 'kfhub_lib';

const routes: Routes = [
    { path: '', redirectTo: 'tarc/sp/search', pathMatch: 'full' },
    { path: 'login', component: KFTarcLoginProxyComponent },
    { path: 'sandboxmain', component: KFTarcSandboxMainComponent },
    { path: 'tarc/sp/search', component: KFTarcSPSearchComponent, canActivate: [AuthGuard] },
    { path: 'tarc/jd/search', component: KFTarcJDSearchComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class KFTarcAppRoutingModule {}
