(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {

		var lang = 'en';
		var searchTerm = 'nula';
		var searchFilter = 'intitle:';
		var domain = 'wikipedia';

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
			generator: 'search',
			gsrsearch: '',
			gsrnamespace: 0,	// 0 article, 6 file
			gsrlimit: 20, // broj rezultata, max 50
			pilimit: 'max', // thumb image for all articles
			exlimit: 'max', // extract limit
			// imlimit: 'max', // images limit
			exintro: '' // extracts intro
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

		function setMaxResults(max) {
			searchParams.gsrlimit = max;
		}

		function getMaxResults() {
			return searchParams.gsrlimit;
		}

        function getSearchParams() {
            return searchParams;
        }

		function setSearchTerm(filter, term) {
			searchTerm = term;
			searchFilter = filter;
			searchParams.gsrsearch = filter + term;
		} // setSearchTerm

		function saveParams() {
			localStorage.wikiSearchTerm = searchTerm || '';
			localStorage.wikiFilter = searchFilter || '';
			localStorage.wikiLang = lang || '';
			localStorage.wikiMaxResult = searchParams.gsrlimit || '';
			localStorage.wikiDomain = domain || '';
		} // saveParams


		return {
            getDefaultParams: getDefaultParams,

            getArticleParams: getArticleParams,
			setArticleTitle: setArticleTitle,

            getSearchParams: getSearchParams,
			setSearchTerm: setSearchTerm,
			getMaxResults: getMaxResults,
			setMaxResults: setMaxResults,
			saveParams: saveParams
		};

	}  // Params

})();
