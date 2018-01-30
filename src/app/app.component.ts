import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

const nonAppPages: Array<string> = [
    "/login"
];

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.less' ]
})
export class AppComponent {
    constructor(private location: Location) {}

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }
}
