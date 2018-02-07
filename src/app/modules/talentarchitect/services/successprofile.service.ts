import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from 'kfhub_lib';
import { TalentArchitectConstantsService } from './talentarchitect-constants.service';

@Injectable()
export class SuccessprofileService {
    private SPMetadataCache: any = null;

    constructor(
        private authService: AuthService,
        private talentArchitectConstants: TalentArchitectConstantsService
    ) {}

    getAssessmentSubscriptions(): Observable<any> {
        let url = this.talentArchitectConstants.getAssessmentsSubscriptionsUrl();
        return this.authService.authHttpCall('GET', url, null, { applicationName: 'TALENT_ACQUISITION' });
    }

    getMetadata(): Observable<any> {
        return new Observable<any>((observer) => {
            if (this.SPMetadataCache) {
                observer.next(this.SPMetadataCache);
                observer.complete();
            } else {
                let url = this.talentArchitectConstants.getSuccessprofilesUrl() + '/?outputType=METADATA';
                this.authService.authHttpCall('GET', url)
                    .subscribe((data: any) => {
                        this.SPMetadataCache = data.metadata;
                        observer.next(this.SPMetadataCache);
                        observer.complete();
                    });
            }
        });
    }

    searchProfile(searchString, filters, sorting, pageIndex, pageSize, relatedProfileId = null): Observable<any> {
        let url = this.talentArchitectConstants.getSuccessprofilesUrl() + '/?type=SEARCH_SUCCESS_PROFILES';

        let sortColumn = 'MODIFIED_ON';
        let sortBy = '';
        if (sorting.length > 0) {
            sorting.forEach((sort, index) => {
                if (index !== 0) {
                    sortColumn += '|';
                    sortBy += '|';
                }

                sortColumn += sort.sortColumn;
                sortBy += sort.sortBy;
            });
        }

        url += '&sortColumn=' + sortColumn +
            '&sortBy=' + sortBy +
            '&searchString=' + (searchString ? searchString : '') +
            '&searchColumn=JOB_TITLE';

        let filterBy = '';
        let filterValues = '';
        if (relatedProfileId) {
            filterBy += 'SUCCESS_PROFILE_IDS';
            filterValues += relatedProfileId;
        }

        if (filters) {
            var opts = filters.reduce((result, filter) => {
                let typeName = (filter.type + 's').toUpperCase();
                if (result[typeName]) {
                    result[typeName] = result[typeName].concat(';' + filter.content.name);
                } else {
                    result[typeName] = filter.content.name;
                }
                return result;
            }, {});

            Object.keys(opts).forEach((key) => {
                if (filterBy.length !== 0) {
                    filterBy += '|';
                    filterValues += '|';
                }

                filterBy += key;
                filterValues += opts[key];
            });
        }

        url += '&filterBy=' + filterBy +
            '&filterValues=' + filterValues +
            '&pageIndex=' + pageIndex || '1' +
            '&pageSize=' + pageSize || '10';

        url = encodeURI(url);

        return this.authService.authHttpCall('GET', url);
    }
}
