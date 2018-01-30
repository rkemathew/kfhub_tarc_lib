import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SPSearchComponent } from './modules/successprofile/search/spsearch.component';

const routes: Routes = [
    { path: 'spsearch', component: SPSearchComponent }
    // { path: 'detail/:id', component: HeroDetailComponent },
    // { path: 'dashboard', component: DashboardComponent },
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
