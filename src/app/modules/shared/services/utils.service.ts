import { Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

const nonAppPages: Array<string> = [
    "/login"
];

@Injectable()
export class UtilsService {
    constructor(private location: Location) {}

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }
}