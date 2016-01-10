'use strict';

function PagesService($http, utils, ParamService) {

    var self = this;
	self.results = null;
	self.exactMatch = null;
    self.showLoadMore = true;

    /*** METHODS ***/

	self.search = function(callback) {
        self.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function handleSearchResponse(data) {
				if (!data.query) return noResults();
				self.results = data.query.pages;
                self.toggleLoadMore(Boolean(data.continue));
                if (data.continue) ParamService.setOffset(data.continue.gsroffset);
				self.exactMatch = findExactTerm(self.results);
				if (!self.exactMatch) return;
				ParamService.setPageTitle(self.exactMatch);
                callback(); // openThePage
			})
			.error(handleErrors);
	}; // search


    self.loadMore = function () {
        // ParamService.setOffset(self.offset);
        var paramUrl = ParamService.createParamUrl(ParamService.getPagesParams());
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                self.toggleLoadMore(Boolean(data.continue));
                if (data.continue) ParamService.setOffset(data.continue.gsroffset);
                if (!data.query) return;
                self.results = self.results.concat(data.query.pages);
			});
    };  // loadMore


    self.clearResults = function() {
        resetErrors();
        self.results = null;
        self.noResultsMessage = null;
        self.exactMatch = null;
        ParamService.resetOffset();
    }; // clearResults


    self.toggleLoadMore = function(bool) {
        self.showLoadMore = bool;
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
            self.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		self.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors

    function noResults() {
        self.noResultsMessage = utils.noResultsMessage;
    }

    function resetErrors() {
		self.error = "";
	}	// resetErrors

} // PagesService


module.exports = PagesService;
