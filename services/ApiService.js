(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ApiService', ApiService);

	function ApiService($http, Params) {

        /*** HTTP ***/

		function getSearchResults(term, callback) {
			Params.updateSearchTerm(term);
			Params.updateBaseUrl();
			var paramUrl = Params.createParamUrl(Params.fullSearchParams());
			// console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
			Params.saveParams();
		} // getSearchResults


		function getArticle(title, callback) {
			Params.updateArticleTitle(title);
			Params.updateBaseUrl();
			var paramUrl = Params.createParamUrl(Params.fullArticleParams());

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
		} // getArticle


		/*** HELPERS ***/

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
