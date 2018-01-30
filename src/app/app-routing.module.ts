import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/modules/auth/login.component';
import { SPSearchComponent } from './modules/successprofile/search/spsearch.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'spsearch', component: SPSearchComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
