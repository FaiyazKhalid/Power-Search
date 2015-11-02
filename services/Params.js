(function() {
    'use strict';
    angular
        .module("wikiModul")
        .service('Params', Params);

    function Params($http, utils) {

        var lang = 'en';
        var searchTerm = 'nula';
        var searchFilter = 'prefix:';
        var domain = 'wikipedia';
		var apiUrl = 'https://en.wikipedia.org/w/api.php';

        var defaulParams = {
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
            // imlimit: 'max', // images limit
            exintro: '' // extracts intro
        };


        /*** GETTERS ***/

        function getSearchResults (term, handleResults) {
            updateSearchTerm(term);
			updateBaseUrl();
			var paramUrl = createParamUrl(fullSearchParams());
			// console.log(paramUrl);
			$http.jsonp(paramUrl)
				.success(handleResults)
				.error(handleErrors);
			saveParams();
		} // getSearchResults

        function getArticle (title, handleResults) {
			updateArticleTitle(title);
			updateBaseUrl();
			var paramUrl = createParamUrl(fullArticleParams());
			$http.jsonp(paramUrl)
				.success(handleResults)
				.error(handleErrors);
		} // getArticle

		function getSearchTerm() {
            return searchTerm;
        }

		function getLang() {
			return lang;
		}

		function getDomain() {
			return domain;
		}

        function getDefaultParams() {
            return defaulParams;
        }

        function getMaxResults() {
            return searchParams.gsrlimit;
        }

        function getFilter() {
            return searchFilter;
        }

        function getBaseUrl() {
            return apiUrl;
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

		function updateDomain(newDomain){
			domain = newDomain;
		}

        function updateSearchTerm(term) {
            searchTerm = term;
            searchParams.gsrsearch = searchFilter + term;
        }

		function updateBaseUrl() {
			apiUrl = 'http://' + lang + '.' + domain + '.org/w/api.php';
			if (domain == 'commons') apiUrl = 'http://commons.wikimedia.org/w/api.php';
		} // updateBaseUrl


        /*** HELPERS ***/

        function fullArticleParams() {
            var fullParams = angular.extend(articleParams, defaulParams);
            return fullParams;
        }

        function fullSearchParams() {
            var fullParams = angular.extend(searchParams, defaulParams);
            return fullParams;
        }

        function createParamUrl(params) {
			var paramUrl = apiUrl + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl

        function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors


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


        return {
			getSearchTerm: getSearchTerm,
            getDefaultParams: getDefaultParams,
            fullArticleParams: fullArticleParams,
			fullSearchParams: fullSearchParams,
			getFilter: getFilter,
            getMaxResults: getMaxResults,
			getLang: getLang,
			getDomain: getDomain,
            getBaseUrl: getBaseUrl,
            getSearchResults: getSearchResults,
            getArticle: getArticle,

            updateArticleTitle: updateArticleTitle,
            updateFilter: updateFilter,
			updateSearchTerm: updateSearchTerm,
            updateMaxResults: updateMaxResults,
			updateBaseUrl: updateBaseUrl,
			updateDomain: updateDomain,

            loadParams: loadParams
        };

    } // Params

})();
