import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/shared/components/auth/login.component';
import { SandboxMainComponent } from './modules/sandboxes/main/sanboxmain.component';
import { SPSearchComponent } from './modules/components/macro/successprofile/search/spsearch.component';

import { AuthGuardService as AuthGuard } from 'kfhub_lib';

const routes: Routes = [
    { path: '', redirectTo: 'tarc/sp/search', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sandboxmain', component: SandboxMainComponent },
    { path: 'tarc/sp/search', component: SPSearchComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
