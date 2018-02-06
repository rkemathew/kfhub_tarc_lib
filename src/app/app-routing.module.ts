import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/shared/components/auth/login.component';
import { SPSearchComponent } from './modules/talentarchitect/successprofile/spsearch.component';

import { AuthGuardService as AuthGuard } from 'kfhub_lib';

const routes: Routes = [
    { path: '', redirectTo: 'tarch/sp/search', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tarch/sp/search', component: SPSearchComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
