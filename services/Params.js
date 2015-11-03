(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {

        // default settings
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

		function getArticleParams() {
			var fullParams = angular.extend(articleParams, baseParams);
			return fullParams;
		}

		function getSearchParams() {
			var fullParams = angular.extend(searchParams, baseParams);
			return fullParams;
		}

		function getApiUrl() {
			var apiUrl = 'http://' + getLang() + '.' + getDomain() + '.org/w/api.php';
			if (getDomain() == 'commons') apiUrl = 'http://commons.wikimedia.org/w/api.php';
            return apiUrl;
		} // getApiUrl


		/*** SETTERS ***/

		function setArticleTitle(newName) {
			articleParams.titles = newName;
		}

		function setMaxResults(max) {
			searchParams.gsrlimit = max;
		}

		function setFilter(filter) {
			searchFilter = filter;
			searchParams.gsrsearch = filter + searchTerm;
		}

		function setDomain(newDomain) {
			domain = newDomain;
		}

		function setSearchTerm(term) {
			searchTerm = term;
			searchParams.gsrsearch = searchFilter + term;
		}


		/*** LOAD and SAVE ***/

		function saveSettings() {
			localStorage.wikiSearchTerm = searchTerm || '';
			localStorage.wikiFilter = searchFilter || '';
			localStorage.wikiLang = lang || '';
			localStorage.wikiMaxResult = searchParams.gsrlimit || '';
			localStorage.wikiDomain = domain || '';
		} // saveSettings

		function loadSettings() {
			lang = localStorage.wikiLang || lang;
			searchParams.gsrlimit = Number(localStorage.wikiMaxResult || searchParams.gsrlimit);
			domain = localStorage.wikiDomain || domain;
			searchTerm = localStorage.wikiSearchTerm || searchTerm;
			searchFilter = localStorage.wikiFilter || searchFilter;
			if (localStorage.wikiFilter === '') searchFilter = '';
		} // loadSettings


        /*** PUBLIC ***/

		return {
			getSearchTerm: getSearchTerm,
			getFilter: getFilter,
			getMaxResults: getMaxResults,
			getLang: getLang,
			getDomain: getDomain,
            getArticleParams: getArticleParams,
			getSearchParams: getSearchParams,
			getApiUrl: getApiUrl,

			setArticleTitle: setArticleTitle,
			setSearchTerm: setSearchTerm,
			setFilter: setFilter,
			setMaxResults: setMaxResults,
			setDomain: setDomain,

			saveSettings: saveSettings,
			loadSettings: loadSettings
		};

	} // Params

})();
