import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';
import { UtilsService } from './shared/services/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.less' ]
})
export class AppComponent {
    public spinkit = Spinkit;
    
    constructor(private utilsService: UtilsService){};

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }
}
