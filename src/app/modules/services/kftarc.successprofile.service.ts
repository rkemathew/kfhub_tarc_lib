import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { KFAuthService, KFFilterMetadata } from 'kfhub_lib';
import { KFTarcTalentArchitectConstantsService } from './kftarc.talentarchitect-constants.service';

@Injectable()
export class KFTarcSuccessprofileService {
    private SPMetadataCache: KFFilterMetadata[] = null;

    constructor(
        private authService: KFAuthService,
        private talentArchitectConstants: KFTarcTalentArchitectConstantsService
    ) {}

    getAssessmentSubscriptions(): Observable<any> {
        let url = this.talentArchitectConstants.getAssessmentsSubscriptionsUrl();
        return this.authService.authHttpCall('GET', url, null, { applicationName: 'TALENT_ACQUISITION' });
    }

    getMetadata(): Observable<KFFilterMetadata[]> {
        return new Observable<KFFilterMetadata[]>((observer) => {
            if (this.SPMetadataCache) {
                observer.next(this.SPMetadataCache);
                observer.complete();
            } else {
                let url = this.talentArchitectConstants.getSuccessprofilesUrl() + '/?outputType=METADATA';
                this.authService.authHttpCall<KFFilterMetadata[]>('GET', url)
                    .subscribe((data: any) => {
                        this.SPMetadataCache = data.metadata;
                        observer.next(this.SPMetadataCache);
                        observer.complete();
                    });
            }
        });
    }

    searchProfile(searchString: string, filters, sorting, pageIndex: number, pageSize: number, relatedProfileId = null): Observable<any> {
        let url = this.talentArchitectConstants.getSuccessprofilesUrl() + '/?type=SEARCH_SUCCESS_PROFILES';

        console.log('searchString', searchString);
        console.log('filters', filters);
        console.log('sorting', sorting);
        console.log('pageIndex', pageIndex);
        console.log('pageSize', pageSize);
        console.log('relatedProfileId', relatedProfileId);

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
                let typeName = (filter.type + 'S').toUpperCase();
                if (result[typeName]) {
                    result[typeName] = result[typeName].concat(';' + filter.id);
                } else {
                    result[typeName] = filter.id;
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
            '&pageIndex=' + (pageIndex || '1') +
            '&pageSize=' + (pageSize || '10');

        url = encodeURI(url);

        return this.authService.authHttpCall('GET', url);
    }
}
