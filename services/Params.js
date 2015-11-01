(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {

		var defaulParams = {
			action: 'query',
			prop: 'extracts|pageimages|info',	// |images| return all images from page
			inprop: 'url',	// return full url
			redirects: '', // automatically resolve redirects
			continue: '',	// continue the query?
			format: 'json',
			formatversion: 2,
			callback: 'JSON_CALLBACK'
		};

		var articleParams = {
			titles: ''
		};

        var searchParams = {

        };

        function getDefaultParams() {
            return defaulParams;
        }

        function getArticleParams(){
			return articleParams;
        }

		function setArticleTitle(newName) {
			articleParams.titles = newName;
		}

        function getSearchParams() {
            return searchParams;
        }

		return {
            getDefaultParams: getDefaultParams,
            getArticleParams: getArticleParams,
			setArticleTitle: setArticleTitle,
            getSearchParams: getSearchParams
		};

	}  // Params

})();
