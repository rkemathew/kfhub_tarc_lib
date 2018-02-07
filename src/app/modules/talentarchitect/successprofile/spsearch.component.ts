import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { FilterMetadata } from 'kfhub_lib'
import { SuccessprofileService } from '../services/successprofile.service';

@Component({
    selector: 'app-spsearch',
    templateUrl: 'spsearch.component.html',
    styleUrls: [ 'spsearch.component.less' ]
})
export class SPSearchComponent implements OnInit {
    private metadata: FilterMetadata[] = null;
    private page: string = 'successProfileSearch';
    private searchString: string = '';
    private searchResults: Array<string> = [];
    private pagingInfo: Object = {};
    private pageIndex: number = 1;
    private pageSize: number = 20;
    private sorting: Array<Object> = [];
    private subscriptions = null;
    private searchLoading: boolean = false;
    private searchQueueLength: number = 0;
    private scrollingPageIndex: number = 0;
    private reSearch: boolean = false;
    private showFilters: boolean = false;
    private allGradesFilter: SelectItem[] = [];
    private allLevelsFilter: SelectItem[] = [];
    private allFunctionsFilter: SelectItem[] = [];
    private selectedGradesFilter: FilterMetadata[] = [];
    private selectedLevelsFilter: FilterMetadata[] = [];
    private selectedFunctionsFilter: FilterMetadata[] = [];
    private appliedFilters: FilterMetadata[] = [];
    private listView: boolean = true;

    constructor(
        private successprofileService: SuccessprofileService
    ) {}

    ngOnInit() {
        this.getSubscriptions();
        this.refreshResults(true);
        this.checkSearch();

        this.successprofileService.getMetadata()
            .subscribe((data: FilterMetadata[]) => {
                this.metadata = data;
                console.log('metadata', this.metadata);

                let successProfileMetadata: FilterMetadata[] = this.metadata.filter((m: FilterMetadata) => m.name === 'SEARCH_SUCCESS_PROFILES');
                console.log('successprofilemetadata', successProfileMetadata);

                let filterMetadata: FilterMetadata[] = successProfileMetadata ? Object.assign({}, successProfileMetadata[0].searchOn) : [];
                console.log('filterMetadata', filterMetadata);

                Object.keys(filterMetadata).forEach((key: string) => {
                    const f = filterMetadata[key];
                    switch(f.name) {
                        case 'GRADES': this.allGradesFilter = f.options.map(option => {
                            return { label: option.value, value: { id: option.id, name: option.value, code: option.name, type: 'GRADE' } }
                        }); break;

                        case 'LEVELS': this.allLevelsFilter = f.options.map(option => {
                            return { label: option.value, value: { id: option.id, name: option.value, code: option.name, type: 'LEVEL' } }
                        }); break;

                        case 'FUNCTIONS': this.allFunctionsFilter = f.options.map(option => {
                            return { label: option.value, value: { id: option.id, name: option.value, code: option.name, type: 'FUNCTION' } }
                        }); break;
                    }
                });

                console.log('this.allGradesFilter', this.allGradesFilter);
            });

//        SPShareService.getPrivacyPolicy('PRODUCTS_HUB');
    }    

    getSubscriptions() {
        this.successprofileService.getAssessmentSubscriptions()
            .subscribe((result) => {
                this.subscriptions = result;
            });
    }

    refreshResults(resetResults){
        this.searchLoading = true;
        this.searchQueueLength++;
        let queuePointer = this.searchQueueLength;

        this.successprofileService.searchProfile(this.searchString, this.appliedFilters, this.sorting, this.pageIndex, this.pageSize)
            .subscribe((response) => {
                this.searchCallback(response, resetResults, queuePointer);
                this.searchLoading = false;
            });
    };

    searchCallback(response, resetResults, queuePointer) {
        if (queuePointer < this.searchQueueLength) {
            return;
        }

        if (!response) {
            this.searchResults = [];
            return;
        }

        this.pageIndex = 1;
        if (resetResults){
            this.searchResults = [];
            this.scrollingPageIndex = this.pageIndex;
        }

        response.jobs.forEach((p) => {
            let date = new Date(parseInt(p.createdDateTime));
            let monthNamesShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            p.dateCreated = monthNamesShort[date.getMonth()] + '-' + date.getDate() + ', ' + date.getFullYear();
    
            this.searchResults.push(p);
        });

        this.pagingInfo = Object.assign({}, response.paging);
    };

    checkSearch() {
        if (this.reSearch) {
            this.reSearch = false;
            this.refreshResults(true);
        }

        setTimeout(this.checkSearch, 300);
    };

    toggleFilters() {
        this.showFilters = !this.showFilters;
    };

    applyFilter() {
        this.appliedFilters = [];
        this.appliedFilters.push.apply(this.appliedFilters, this.selectedGradesFilter);
        this.appliedFilters.push.apply(this.appliedFilters, this.selectedLevelsFilter);
        this.appliedFilters.push.apply(this.appliedFilters, this.selectedFunctionsFilter);
        this.refreshResults(true);
    }

    removeFilter(filterToRemove: FilterMetadata) {
        const appliedFilterIndex = this.appliedFilters.findIndex((appliedFilter: FilterMetadata) => {
            return appliedFilter.type == filterToRemove.type && appliedFilter.id === filterToRemove.id;
        });

        this.appliedFilters.splice(appliedFilterIndex, 1);

        switch(filterToRemove.type) {
            case 'GRADE':
                this.selectedGradesFilter = this.selectedGradesFilter.filter((filter: FilterMetadata) => {
                    return (filter.type === filterToRemove.type && filter.id === filterToRemove.id) ? false : true;
                });
                break;

            case 'LEVEL': 
                this.selectedLevelsFilter = this.selectedLevelsFilter.filter((filter: FilterMetadata) => {
                    return (filter.type === filterToRemove.type && filter.id === filterToRemove.id) ? false : true;
                });
                break;

            case 'FUNCTION':
                this.selectedFunctionsFilter = this.selectedFunctionsFilter.filter((filter: FilterMetadata) => {
                    return (filter.type === filterToRemove.type && filter.id === filterToRemove.id) ? false : true;
                });
                break;
        }

        this.refreshResults(true);
    }
    
    removeAllFilters() {
        this.appliedFilters = [];
        this.selectedGradesFilter = [];
        this.selectedLevelsFilter = [];
        this.selectedFunctionsFilter = [];
        this.refreshResults(true);
    }

    sortResults(colName) {
/*        
        let index = this.sorting.map((entry) => entry.sortColumn).indexOf(colName);
        if (index === -1) {
            this.sorting.push({
                sortColumn: colName,
                sortBy: 'ASC'
            });
        } else {
            console.log(this.sorting[index].sortBy);
            if (this.sorting[index].sortBy === 'ASC') {
                this.sorting[index].sortBy = 'DESC';
            } else if (this.sorting[index].sortBy === 'HIDE') {
                this.sorting[index].sortBy = 'ASC';
            } else {
                this.sorting[index].sortBy = 'HIDE';
                this.sorting = [];
                return false;
            }
        }

        this.refreshResults(true);
*/
    }

    sortingInOrder = function(colName) {
        var sortObj = this.sorting.find((s) => s.sortColumn === colName);
        return sortObj ? sortObj.sortBy : false;
    }

    loadMoreResults() {
/*        
        if ((this.scrollingPageIndex + 1) > this.pagingInfo.totalPages || !this.searchResults.length) {
            return;
        }

        if (this.page === 'successProfileSearch' && !this.searchLoading && $(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            this.scrollingPageIndex += 1;
            this.pageIndex = this.scrollingPageIndex;
            this.refreshResults(false);
        }
*/
    };

    // angular.element($window).on('scroll', loadMoreResults);
    // $scope.$on('$destroy', function () {
    //     angular.element($window).off('scroll', loadMoreResults);
    // });

    // Update the applied filters when the filter selection is changed
    filtersChanged(type, value) {
        let filters = value.map((filter) => {
            return {
                content: filter,
                type: type,
            };
        });

/*
        this.appliedFilters = _
            .chain(this.appliedFilters)
            .reject(function (filter) {
                return filter.type === type;
            })
            .concat(filters)
            .value();

        this.refreshResults(true);
*/
    };

    doSearch() {
    }
}
