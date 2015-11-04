(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('WikiApi', WikiApi);

	// TODO: proveriti imageThumbUrl onload error, ako nema manje slike, staviti obe velike

	function WikiApi($http, utils, Params) {

		var thumbSize = 150;

        /*** HTTP ***/

		function search(params, callback) {
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


        /*** PUBLIC ***/

		return {
			search: search,
			open: open
		};

	} // WikiApi

})();
