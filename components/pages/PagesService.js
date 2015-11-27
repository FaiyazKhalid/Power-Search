'use strict';

// kada povecam broj rezultata ne radi load more (ponavlja isto)
// ne pojavljuje se ponovo dugme kad se sakrije

function PagesService($http, utils, ParamService) {

    var pages = this;

	pages.params = ParamService;
	pages.results = null;
	pages.exactMatch = null;
    pages.showingLoadMore = true;


    /*** HTTP ***/

	pages.search = function(callback) {
        pages.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function handleSearchResponse(data) {
				if (!data.query) return noResults();
				pages.results = data.query.pages;
                pages.showLoadMore(Boolean(data.continue));
                if (data.continue) pages.offset = data.continue.gsroffset;
				pages.exactMatch = findExactTerm(pages.results);
				if (!pages.exactMatch) return;
				ParamService.setPageTitle(pages.exactMatch);
                callback(); // openThePage
			})
			.error(handleErrors);
	}; // search


    pages.loadMore = function () {
        ParamService.setOffset(pages.offset);
        var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
        // console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                pages.showLoadMore(Boolean(data.continue));
                if (data.continue) pages.offset = data.continue.gsroffset;
                if (!data.query) return;
                pages.results = pages.results.concat(data.query.pages);
			});
    };  // loadMore


    pages.clearResults = function() {
        resetErrors();
        pages.results = null;
        pages.noResultsMessage = null;
        pages.exactMatch = null;
        pages.offset = null;
    }; // clearResults


    pages.showLoadMore = function(bool) {
        pages.showingLoadMore = bool;
    };


    /*** HELPERS ***/

    function findExactTerm(results){
		var capitalizedTerm = utils.capitalize(ParamService.getSearchTerm());
		var found = null;
		angular.forEach(results, function(result) {
			if (capitalizedTerm == utils.capitalize(result.title)) found = result.title;
			for(var r in result.redirects) {
				if(capitalizedTerm == utils.capitalize(result.redirects[r].title) ) {
					found = found || result.title;
				}
			}
		});
		return found;
	}	// findExactTerm

    function handleErrors(data, status) {
        if(status == 404) {
            pages.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		pages.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors

    function noResults() {
        pages.noResultsMessage = utils.noResultsMessage;
    }

    function resetErrors() {
		pages.error = "";
	}	// resetErrors

} // PagesService


module.exports = PagesService;
