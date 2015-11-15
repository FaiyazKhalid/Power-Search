'use strict';

function Pages($http, utils, Params) {

    var pages = this;

	pages.params = Params;
	pages.results = null;
	pages.exactMatch = null;


    /*** HTTP ***/

	pages.search = function() {
		var paramUrl = Params.createParamUrl(Params.getPagesParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				pages.exactMatch = null;
				if (!data.query) return noResults();
				pages.results = data.query.pages;
				pages.exactMatch = findExactTerm();
				if (!pages.exactMatch) return;
				Params.setPageTitle(pages.exactMatch);
				// pages.open(Params.getPageParams());
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
            pages.error = "The main domain you requesting does not exist. Try again with different criteria.";
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

} // Pages


module.exports = Pages;
