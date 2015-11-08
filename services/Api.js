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
					if (api.page.pageimage) {
						var filename = api.page.pageimage;
						var thumbUrl = api.page.thumbnail.source;
						api.page.imageUrl = createImageUrl(filename, thumbUrl);
						api.page.imageThumbUrl = createThumbUrl();
						checkThumbImage();
					}
				})
				.error(handleErrors);
		}; // open


        /*** HELPERS ***/

		function createThumbUrl() {
			var thumbUrl = api.page.thumbnail.source;
			var newSize = leadThumbSize;
			var regex = /\/(\d+)px-/gi;
			var newThumbSize = "/" + newSize + "px-";
			var newUrl = thumbUrl.replace(regex, newThumbSize);
			return newUrl;
		}	// createThumbUrl

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

        function checkThumbImage() {
			var test = new Image();
			test.onerror = function() {
				$rootScope.$apply(function(){
	 				api.page.imageThumbUrl = api.page.imageUrl;
				 });
			};
			test.src = api.page.imageThumbUrl;
		}	// checkThumbImage

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

		function handleErrors(data, status, headers, config) {
			api.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors

	} // Api

})();
