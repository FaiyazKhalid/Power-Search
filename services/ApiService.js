(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ApiService', ApiService);

	function ApiService($http, utils, Params) {

        /*** HTTP ***/

		function searchWikipedia(params, callback) {
			var paramUrl = createParamUrl(params);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (!data.query) return;
					var results = data.query.pages;
					callback(results);
				})
				.error(handleErrors);
			Params.saveSettings();
		} // searchWikipedia


		function getArticle(params, callback) {
			var paramUrl = createParamUrl(params);

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (!data.query) return;
					var page = data.query.pages[0];
					// removeRedirections(data.query.redirects, wiki.results);
					if (page.pageimage) createImageUrl(page);
					callback(page);
				})
				.error(handleErrors);
		} // getArticle


		/*** HELPERS ***/

		function createImageUrl(page) {
			var filename = page.pageimage;
			var thumbUrl = page.thumbnail.source;
			console.log(thumbUrl);

			var imgSizeRegex = /\/(\d+)px-/gi;
			var newThumbSize = "/150px-";
			page.imageThumbUrl = thumbUrl.replace(imgSizeRegex, newThumbSize);

			// izvuci cist src			
			page.imageUrl = page.thumbnail.source;
			return page;
		} // createImageUrl


        function createParamUrl(params) {
			var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl

        function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors

		function removeRedirections(redirects, results) {
			for (var x in results) {
				for (var r in redirects) {
					if (redirects[r].to == results[x].title) {
						results.splice(x, 1);
					}
				}
			} // end for
			return results;
		} // removeRedirections


        /*** PUBLIC ***/

		return {
			searchWikipedia: searchWikipedia,
			getArticle: getArticle
		};

	} // ApiService

})();
