(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {
        // defaults
		var lang = 'en';
		var searchTerm = 'nula';
		var searchFilter = 'prefix:';
		var domain = 'wikipedia';

		var baseParams = {
			action: 'query',
			prop: 'extracts|pageimages|info', // |images| return all images from page
			inprop: 'url', // return full url
			redirects: '', // automatically resolve redirects
			continue: '', // continue the query?
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
			gsrnamespace: 0, // 0 article, 6 file
			gsrlimit: 20, // broj rezultata, max 50
			pilimit: 'max', // thumb image for all articles
			exlimit: 'max', // extract limit
			// imlimit: 'max', // images limit, only if prop:images enabled
			exintro: '' // extracts intro
		};


		/*** GETTERS ***/

		function getSearchTerm() {
			return searchTerm;
		}

		function getLang() {
			return lang;
		}

		function getDomain() {
			return domain;
		}

		function getMaxResults() {
			return searchParams.gsrlimit;
		}

		function getFilter() {
			return searchFilter;
		}


		/*** SETTERS ***/

		function updateArticleTitle(newName) {
			articleParams.titles = newName;
		}

		function updateMaxResults(max) {
			searchParams.gsrlimit = max;
		}

		function updateFilter(filter) {
			searchFilter = filter;
			searchParams.gsrsearch = filter + searchTerm;
		}

		function updateDomain(newDomain) {
			domain = newDomain;
		}

		function updateSearchTerm(term) {
			searchTerm = term;
			searchParams.gsrsearch = searchFilter + term;
		}


		/*** HELPERS ***/

		function fullArticleParams() {
			var fullParams = angular.extend(articleParams, baseParams);
			return fullParams;
		}

		function fullSearchParams() {
			var fullParams = angular.extend(searchParams, baseParams);
			return fullParams;
		}


		/*** LOAD and SAVE ***/

		function saveParams() {
			localStorage.wikiSearchTerm = searchTerm || '';
			localStorage.wikiFilter = searchFilter || '';
			localStorage.wikiLang = lang || '';
			localStorage.wikiMaxResult = searchParams.gsrlimit || '';
			localStorage.wikiDomain = domain || '';
		} // saveParams

		function loadParams() {
			lang = localStorage.wikiLang || lang;
			searchParams.gsrlimit = Number(localStorage.wikiMaxResult || searchParams.gsrlimit);
			domain = localStorage.wikiDomain || domain;
			searchTerm = localStorage.wikiSearchTerm || searchTerm;
			searchFilter = localStorage.wikiFilter || searchFilter;
			if (localStorage.wikiFilter === '') searchFilter = '';
		} // loadParams


        /*** PUBLIC ***/

		return {
			getSearchTerm: getSearchTerm,
			getFilter: getFilter,
			getMaxResults: getMaxResults,
			getLang: getLang,
			getDomain: getDomain,

            fullArticleParams: fullArticleParams,
			fullSearchParams: fullSearchParams,

			updateArticleTitle: updateArticleTitle,
			updateSearchTerm: updateSearchTerm,			
			updateFilter: updateFilter,
			updateMaxResults: updateMaxResults,
			updateDomain: updateDomain,

			loadParams: loadParams,
			saveParams: saveParams
		};

	} // Params

})();
