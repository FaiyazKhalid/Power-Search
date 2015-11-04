(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('WikiApi', WikiApi);

	// TODO: proveriti imageThumbUrl onload error, ako nema manje slike, staviti obe velike

	function WikiApi($http, utils, Params) {

		var thumbSize = 150;
		var searchResults = null;
		var exactMatch = null;
		var openedPage = null;


        /*** HTTP ***/

		function search(params, callback) {
			var paramUrl = createParamUrl(params);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					exactMatch = null;
					searchResults = null;
					if (!data.query) return;
					var results = data.query.pages;
					exactMatch = findTerm(Params.getSearchTerm(), results);
					if (exactMatch) removeFromResults(exactMatch, results);
					searchResults = results;
					callback();
				})
				.error(handleErrors);
			Params.saveSettings();
		} // search


		function open(params, callback) {
			var paramUrl = createParamUrl(params);

			$http.jsonp(paramUrl)
				.success(function (data) {
					openedPage = null;
					if (!data.query) return;
					openedPage = data.query.pages[0];
					if (openedPage.pageimage) {
						openedPage.imageUrl = createFullImageUrl(openedPage.thumbnail.source, openedPage.pageimage);
						openedPage.imageThumbUrl = changeThumbSize(openedPage.thumbnail.source, thumbSize);
					}
					callback();
				})
				.error(handleErrors);
		} // open


		/*** GETTERS ***/

		function getSearchResults () {
			return searchResults;
		}

		function getExactMatch () {
		  return exactMatch;
		}

		function getOpenedPage () {
			return openedPage;
		}


		/*** HELPERS ***/

		function changeThumbSize(thumbUrl, newSize) {
			var regex = /\/(\d+)px-/gi;
			var newThumbSize = "/" + newSize + "px-";
			var newUrl = thumbUrl.replace(regex, newThumbSize);
			return newUrl;
		}	// changeThumbSize

		function createFullImageUrl(thumbUrl, filename) {
			var substrEnd = thumbUrl.indexOf(filename) + filename.length;
			var newUrl = thumbUrl.substring(0, substrEnd).replace("thumb/", "");
			return newUrl;
		}	// createFullImageUrl

        function createParamUrl(params) {
			var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl

        function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors

		function findTerm(searchTerm, results){
			var found = null;
			_.each(results, function(result){
				if (utils.capitalizeFirst(searchTerm) == result.title) found = result.title;
				if (searchTerm.toLowerCase() == result.title.toLowerCase()) {
					found = found || result.title;
				}
			});
			return found;
		}	// findTerm

		function removeFromResults(title, results) {
			for (var x in results) {
				if (results[x].title == title) {
					results.splice(x, 1); // remove it from the list
					return results;
				}
			} // end for
		} // removeFromResults


        /*** EXPOSE PUBLIC ***/

		return {
			search: search,
			open: open,
			getSearchResults: getSearchResults,
			getExactMatch: getExactMatch,
			getOpenedPage: getOpenedPage
		};

	} // WikiApi

})();