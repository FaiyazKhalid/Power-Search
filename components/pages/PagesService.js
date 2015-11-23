'use strict';

function PagesService($http, utils, ParamService) {

    var pages = this;

	pages.params = ParamService;
	pages.results = null;
	pages.exactMatch = null;


    /*** HTTP ***/

	pages.search = function(callback) {
		var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				pages.exactMatch = null;
				if (!data.query) return noResults();
				pages.results = data.query.pages;
				pages.exactMatch = findExactTerm();
				if (!pages.exactMatch) return;
				ParamService.setPageTitle(pages.exactMatch);
                callback(); // openThePage
			})
			.error(handleErrors);
	}; // search

    pages.clearResults = function() {
        resetErrors();
        pages.results = null;
        pages.noResults = null;
    }; // clearResults


    /*** HELPERS ***/

    function findExactTerm(){
		var capitalizedTerm = utils.capitalize(pages.params.settings.searchTerm);
		var results = pages.results;
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
        pages.noResults = "No results for the search term. Try again with different criteria.";
    }

    function resetErrors() {
		pages.error = "";
	}	// resetErrors

} // PagesService


module.exports = PagesService;
