(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ApiService', ApiService);

	function ApiService($http, utils, Params) {


        /*** HTTP ***/

		function getSearchResults(term, callback) {
			var paramUrl = createParamUrl(Params.fullSearchParams());
			// console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
			Params.saveParams();
		} // getSearchResults


		function getArticle(title, callback) {
			var paramUrl = createParamUrl(Params.fullArticleParams());

			$http.jsonp(paramUrl)
				.success(function (data) {
					callback(data);
				})
				.error(handleErrors);
		} // getArticle


		/*** HELPERS ***/

        function getApiUrl() {
			var apiUrl = 'http://' + Params.getLang() + '.' + Params.getDomain() + '.org/w/api.php';
			if (Params.getDomain() == 'commons') apiUrl = 'http://commons.wikimedia.org/w/api.php';
            return apiUrl;
		} // updateApiUrl

        function createParamUrl(params) {
			var paramUrl = getApiUrl() + '?' + utils.serialize(params);
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
