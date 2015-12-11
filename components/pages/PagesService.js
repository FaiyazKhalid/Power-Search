'use strict';

function PagesService($http, utils, ParamService) {

    var service = this;
	service.results = null;
	service.exactMatch = null;
    service.showLoadMore = true;

    /*** METHODS ***/

	service.search = function(callback) {
        service.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function handleSearchResponse(data) {
				if (!data.query) return noResults();
				service.results = data.query.pages;
                service.toggleLoadMore(Boolean(data.continue));
                if (data.continue) service.offset = data.continue.gsroffset;
				service.exactMatch = findExactTerm(service.results);
				if (!service.exactMatch) return;
				ParamService.setPageTitle(service.exactMatch);
                callback(); // openThePage
			})
			.error(handleErrors);
	}; // search


    service.loadMore = function () {
        ParamService.setOffset(service.offset);
        var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
        // console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                service.toggleLoadMore(Boolean(data.continue));
                if (data.continue) service.offset = data.continue.gsroffset;
                if (!data.query) return;
                service.results = service.results.concat(data.query.pages);
			});
    };  // loadMore


    service.clearResults = function() {
        resetErrors();
        service.results = null;
        service.noResultsMessage = null;
        service.exactMatch = null;
        service.offset = null;
    }; // clearResults


    service.toggleLoadMore = function(bool) {
        service.showLoadMore = bool;
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
            service.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		service.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors

    function noResults() {
        service.noResultsMessage = utils.noResultsMessage;
    }

    function resetErrors() {
		service.error = "";
	}	// resetErrors

} // PagesService


module.exports = PagesService;
