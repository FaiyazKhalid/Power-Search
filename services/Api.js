(function () {

	'use strict';
	angular
		.module("wikiModul")
		.service('Api', Api);


	function Api($http, utils, Params, $rootScope) {

        var api = this;
		api.params = Params;
		var leadThumbSize = 150;

		api.page = null;
		api.results = null;
		api.exactMatch = null;


        /*** HTTP ***/

		api.search = function() {
			var paramUrl = createParamUrl(Params.getSearchParams());
			console.log(paramUrl);
			$http.jsonp(paramUrl)
				.success(function (data) {
					api.exactMatch = null;
					if (!data.query) return;
					api.results = data.query.pages;
					findImagePages();
					api.exactMatch = findExactTerm();
					if (!api.exactMatch) return;
					api.params.setArticleTitle(api.exactMatch);
					api.open(Params.getArticleParams());
				})
				.error(handleErrors);
		}; // search


		api.open = function() {
			var paramUrl = createParamUrl(Params.getArticleParams());
			//console.log(paramUrl);
			$http.jsonp(paramUrl)
				.success(function (data) {
					api.page = null;
					if (!data.query) return;
					api.page = data.query.pages[0];
					if (api.page.pageimage) {
						var filename = api.page.pageimage;
						var thumbUrl = api.page.thumbnail.source;
						api.page.imageUrl = createImageUrl(filename, thumbUrl);
					}
				})
				.error(handleErrors);
		}; // open


        /*** HELPERS ***/

		function createImageUrl(filename, thumbUrl) {
			var escaped = escape(filename);
			var substrEnd = thumbUrl.indexOf(escaped) + escaped.length;
			var newUrl = thumbUrl.substring(0, substrEnd).replace("thumb/", "");
			return newUrl;
		}	// createImageUrl

        function createParamUrl(params) {
			var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl

		function findExactTerm(){
			var searchTerm = api.params.settings.searchTerm;
			var results = api.results;
			var found = null;
			angular.forEach(results, function(result) {
				if (utils.capitalize(searchTerm) == utils.capitalize(result.title)) found = result.title;
				for(var redirect in result.redirects) {
					if(utils.capitalize(searchTerm) == utils.capitalize(result.redirects[redirect].title) ) {
						found = found || result.title;
					}
				}
			});
			return found;
		}	// findExactTerm

		function findImagePages() {
			for(var r in api.results) {
				if(api.results[r].pageimage) {
					var imgSrc = api.results[r].thumbnail.source;
					var commonsUrl = "https://upload.wikimedia.org/wikipedia/commons/";
					var imageName = api.results[r].pageimage;
					if(utils.startsWith(imgSrc, commonsUrl)) {
						api.results[r].imagePage = "https://commons.wikimedia.org/wiki/File:" + 	imageName;
					} else {
						api.results[r].imagePage = "https://" + api.params.settings.lang + "." + api.params.settings.domain + ".org/wiki/File:" + imageName;
					}
				}
			}	// end for
		} // findImagePages

		function handleErrors(data, status, headers, config) {
			api.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors

	} // Api

})();
