(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Api', Api);


	function Api(_, $http, utils, Params) {

        var api = this;
		var thumbSize = 150;

		api.page = null;
		api.results = null;
		api.exactMatch = null;


        /*** HTTP ***/

		api.search = function(params, callback) {
			var paramUrl = createParamUrl(params);
			//console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					api.exactMatch = null;
					api.results = null;
					if (!data.query) return;
					var results = data.query.pages;
					api.exactMatch = findTerm(Params.getSearchTerm(), results);
					if (api.exactMatch) removeFromResults(api.exactMatch, results);
					api.results = results;
					callback();
				})
				.error(handleErrors);
			Params.saveSettings();
		}; // search


		api.open = function(params, callback) {
			var paramUrl = createParamUrl(params);
            console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					api.page = null;
					if (!data.query) return;
					api.page = data.query.pages[0];
					if (api.page.pageimage) {
						api.page.imageUrl = createFullImageUrl(api.page.thumbnail.source, api.page.pageimage);
						api.page.imageThumbUrl = createThumbUrl(api.page.thumbnail.source, thumbSize);
					}
				})
				.error(handleErrors);
		}; // open


        function checkThumbImage() {
			var test = new Image();

			test.onerror = function() {
				console.log("nema thumba");
				api.page.imageThumbUrl = api.page.imageUrl;
			};

			test.onload = function() {
				console.log("ima thumba");
			};
			test.src = api.page.imageThumbUrl;
		}	// checkThumbImage


        /*** HELPERS ***/

		function createThumbUrl(thumbUrl, newSize) {
			var regex = /\/(\d+)px-/gi;
			var newThumbSize = "/" + newSize + "px-";
			var newUrl = thumbUrl.replace(regex, newThumbSize);
			return newUrl;
		}	// createThumbUrl

		function createFullImageUrl(thumbUrl, filename) {
			var escaped = escape(filename);
			var substrEnd = thumbUrl.indexOf(escaped) + escaped.length;
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


	} // Api

})();
