(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ApiService', ApiService);

	function ApiService($http, utils, Params) {


        /*** HTTP ***/

		function getSearchResults(params, callback) {
			var paramUrl = createParamUrl(params);
			// console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
			Params.saveSettings();
		} // getSearchResults


		function getArticle(params, callback) {
			var paramUrl = createParamUrl(params);

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
		} // getArticle


		/*** HELPERS ***/


        function createParamUrl(params) {
			var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl

        function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors


        /*** PUBLIC ***/

		return {
			getSearchResults: getSearchResults,
			getArticle: getArticle
		};

	} // ApiService

})();
