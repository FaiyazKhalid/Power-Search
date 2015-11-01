(function() {
    'use strict';
    angular
        .module("wikiModul")
        .service('Params', Params);

    function Params() {

        var lang = 'en';
        var searchTerm = 'nula';
        var searchFilter = 'prefix:';
        var domain = 'wikipedia';

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

		function getSearchTerm() {
            return searchTerm;
        }

        function getDefaultParams() {
            return defaulParams;
        }

        function getArticleParams() {
            return articleParams;
        }

        function getMaxResults() {
            return searchParams.gsrlimit;
        }

        function getSearchParams() {
            return searchParams;
        }

        function getFilter() {
            return searchFilter;
        }


        function setArticleTitle(newName) {
            articleParams.titles = newName;
        }

        function setMaxResults(max) {
            searchParams.gsrlimit = max;
        }

        function setFilter(filter) {
            searchFilter = filter;
            searchParams.gsrsearch = filter + term;
        }

        function setSearchTerm(term) {
            searchTerm = term;
            searchParams.gsrsearch = filter + term;
        }

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
            getArticleParams: getArticleParams,
			getSearchParams: getSearchParams,
			getFilter: getFilter,
            getMaxResults: getMaxResults,

            setArticleTitle: setArticleTitle,
            setFilter: setFilter,
			setSearchTerm: setSearchTerm,
            setMaxResults: setMaxResults,

            saveParams: saveParams,
            loadParams: loadParams
        };

    } // Params

})();
