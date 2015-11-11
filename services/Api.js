'use strict';

function Api($http, utils, Params) {

    var api = this;
	api.params = Params;
	api.page = null;
	api.results = null;
	api.exactMatch = null;


    /*** HTTP ***/

	api.search = function() {
        api.noResults = "";
		var paramUrl = createParamUrl(Params.getSearchParams());
		//console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				api.exactMatch = null;
				if (!data.query) return noResults();
				api.results = data.query.pages;
				angular.forEach(api.results, findImage);
				api.exactMatch = findExactTerm();
				if (!api.exactMatch) return;
				api.params.setArticleTitle(api.exactMatch);
				api.open(Params.getArticleParams());
			})
			.error(handleErrors);
	}; // search


	api.open = function() {
		var paramUrl = createParamUrl(Params.getArticleParams());
		$http.jsonp(paramUrl)
			.success(function (data) {
				api.page = null;
				if (!data.query) return;
				api.page = data.query.pages[0];
				findImage(api.page);
			})
			.error(handleErrors);
	}; // open


    api.resetLeadImage = function(){
        api.page.image = null;
    };

    /*** HELPERS ***/

	function findImage(thisResult) {
		if(thisResult.pageimage) {
			var imgSrc = thisResult.thumbnail.source;
			var imageName = thisResult.pageimage;
			var commonsUrl = "https://upload.wikimedia.org/wikipedia/commons/";

			if (utils.startsWith(imgSrc, commonsUrl)) {
				thisResult.image = "https://commons.wikimedia.org/wiki/File:" + imageName;
			} else {
				thisResult.image = "https://" + api.params.settings.lang + "." + api.params.settings.domain + ".org/wiki/File:" + imageName;
			}
		}
	} // findImage

    function createParamUrl(params) {
		var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
		return paramUrl;
	} // createParamUrl

	function findExactTerm(){
		var capitalizedTerm = utils.capitalize(api.params.settings.searchTerm);
		var results = api.results;
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
            api.error = "The wiki domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		api.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors

    function noResults() {
        api.noResults = "No results for the search term. Try again with different criteria.";
    }

} // Api


module.exports = Api;
