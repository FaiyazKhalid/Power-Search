(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ApiService', ApiService);

	function ApiService($http, utils, Params) {

		var thumbSize = 150;

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
					if (page.pageimage) createImageUrls(page.pageimage, page.thumbnail.source);
					callback(page);
				})
				.error(handleErrors);
		} // getArticle


		/*** HELPERS ***/

		function createImageUrls(filename, thumbUrl) {
			page.imageThumbUrl = changeThumbSize(thumbUrl, thumbSize);
			page.imageUrl = createFullImageUrl(thumbUrl, filename);
			// TODO: proveriti onload error, ako nema manje, obe velike
			return page;
		} // createImageUrls

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
