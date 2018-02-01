import { Component } from '@angular/core';

import { UtilsService } from './shared/services/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.less' ]
})
export class AppComponent {
    constructor(private utilsService: UtilsService){};

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }
}
