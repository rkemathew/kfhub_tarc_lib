import { Component, OnInit } from '@angular/core';

import { FilterMetadata } from 'kfhub_lib'
import { SuccessprofileService } from '../services/successprofile.service';

@Component({
    selector: 'app-spsearch',
    templateUrl: 'spsearch.component.html',
    styleUrls: [ 'spsearch.component.less' ]
})
export class SPSearchComponent implements OnInit {
    private page: string = 'successProfileSearch';
    public searchString: string = '';//$route.current.params.queryString || '';
    public searchResults: Array<string> = [];
    private pagingInfo: Object = {};
    private pageIndex: number = 1;
    private pageSize: number = 20;
    private sorting: Array<Object> = [];
    private subscriptions = null;
    private selectedFunctionFilters: Array<Object> = [];
    private selectedLevelFilters: Array<Object> = [];
    private selectedGradeFilters: Array<Object> = [];
    public searchLoading: boolean = false;
    private searchQueueLength: number = 0;
    private scrollingPageIndex: number = 0;
    private reSearch: boolean = false;
    private showFilters: boolean = false;
    public appliedFilters: Array<Object> = [];
    public listView: boolean = true;

    constructor(
        private successprofileService: SuccessprofileService
    ) {}

    ngOnInit() {
        this.getSubscriptions();
        this.refreshResults(true);
        this.checkSearch();

        // let metadata = SearchService.getMetadata('jobDescriptionSearch')
//        let metadata: FilterMetadata[] = [];
//        let successProfileMetadata: FilterMetadata[] = metadata.filter((m) => m.name === 'SEARCH_SUCCESS_PROFILES');
//        let filterMetadata: FilterMetadata[] = successProfileMetadata ? Object.assign({}, successProfileMetadata[0].searchOn) : [];

//        filterMetadata.forEach((f) => {
//            $scope['all' + this.capitalizeFirstChar(f.name) + 'Filters'] = Object.assign({}, f.options);
//        });

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

//        SearchService.searchProfile($scope.page, $scope.searchString, $scope.appliedFilters, $scope.sorting, $scope.pageIndex, $scope.pageSize).then(function(response){
//            this.searchCallback(response, resetResults, queuePointer);
            this.searchLoading = false;
//        });
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

    capitalizeFirstChar(filterName) {
        return filterName.toLowerCase().charAt(0).toUpperCase() + filterName.toLowerCase().slice(1);
    };

    toggleFilters() {
        this.showFilters = !this.showFilters;
    };

    addFilter(type, filter) {
/*
        var newFilter = {
            type: type,
            content: filter
        };

        let index = this.appliedFilters.findIndex((f) => f.type === type && f.content.name === filter.name);
        if (index !== -1) {
            if (index > -1) {
                this.removeFilter(index, this.appliedFilter);
            }
        } else {
            this.appliedFilters.push(newFilter);
            console.log("new filter: ", newFilter);
            newFilter.isFiltered = true;
        }

        this.refreshResults(true);
*/
    };

    isFiltered(type, filter) {
//        return this.appliedFilters.findIndex((f) => f.type === type && f.content.name === filter.name && f.isFiltered) > -1;
    }

    removeFilter(index, appliedFilter) {
/*
        this.appliedFilters.splice(index, 1);

        switch (appliedFilter.type) {
            case 'grade':
                this.selectedGradeFilters = this.selectedGradeFilters.filter((filter) => filter.id !== appliedFilter.content.id);
                break;
            case 'level':
                this.selectedLevelFilters = this.selectedLevelFilters.filter((filter) => filter.id !== appliedFilter.content.id);
                break;
            case 'function':
                this.selectedFunctionFilters = this.selectedFunctionFilters.filter( (filter) => filter.id !== appliedFilter.content.id);
                break;
            default:
                break;
        };

        this.refreshResults(true);
*/
    }
    
    removeAllFilter() {
        this.appliedFilters = [];
        this.selectedGradeFilters = [];
        this.selectedLevelFilters = [];
        this.selectedFunctionFilters = [];
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

    setFavorite = function(profile) {
        profile.favorite = !profile.favorite;
    }

    setListView(listView) {
        listView = listView;
    };

    createJobDescription(successProfileId) {
//        WizardService.createJDFromSP(successProfileId).then(function (res) {
//            $location.path('/talentarchitect/jobdescription/jobs/new');
//        })
    };

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
