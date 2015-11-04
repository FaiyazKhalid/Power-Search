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


        /*** HTTP ***/

		function search(params, callback) {
			var paramUrl = createParamUrl(params);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					exactMatch = null;
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
					if (!data.query) return;
					var page = data.query.pages[0];
					if (page.pageimage) {
						page.imageUrl = createFullImageUrl(page.thumbnail.source, page.pageimage);
						page.imageThumbUrl = changeThumbSize(page.thumbnail.source, thumbSize);
					}
					callback(page);
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
			var exactMatch = null;
			_.each(results, function(result){
				if (result.title.toLowerCase() == searchTerm.toLowerCase()) {
					exactMatch = result.title;
				}
			});
			return exactMatch;
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
			getExactMatch: getExactMatch
		};

	} // WikiApi

})();
