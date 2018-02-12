import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { AdvGrowlModule } from 'primeng-advanced-growl';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { MessageService } from 'primeng/components/common/messageservice';

import { AppRoutingModule } from './app-routing.module';
import { SandboxesModule } from './modules/sandboxes/sandboxes.module';
import { TalentArchitectModule } from './modules/components/talentarchitect.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/shared/components/auth/login.component';

import { UtilsService } from './modules/shared/services/utils.service';

import { SharedModule, KFComponentsModule, AuthGuardService, AuthService, PopupService } from 'kfhub_lib';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./languages/", ".json");
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        NgHttpLoaderModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ModalModule.forRoot(),
        BootstrapModalModule,
        AdvGrowlModule,
        AppRoutingModule,
        SandboxesModule,
        SharedModule,
        KFComponentsModule,
        TalentArchitectModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        TranslateService,
        MessageService,
        AuthGuardService,
        AuthService,
        PopupService,
        UtilsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'de', 'es-ar', 'ja', 'pl', 'tr', 'zh']);
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
