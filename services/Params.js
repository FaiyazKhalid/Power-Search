(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {

		var params = this;
        // default settings
		params.lang = 'en';
		params.searchTerm = 'nula';
		params.searchFilter = 'prefix:';
		params.domain = 'wikipedia';

        params.baseParams = {
            action: 'query',
            prop: 'extracts|pageimages|info', // |images| return all images from page
            //pithumbsize: 100,	// thumb image size (height?)
            inprop: 'url', // return article url
            redirects: '', // automatically resolve redirects
            continue: '', // continue the query?
            format: 'json',
            formatversion: 2,
            callback: 'JSON_CALLBACK'
        };

        params.articleParams = {
            titles: ''
        };

        params.searchParams = {
            generator: 'search',
            gsrsearch: '',
            gsrnamespace: 0, // 0 article, 6 file
            gsrlimit: 20, // broj rezultata, max 50
            pilimit: 'max', // thumb image for all articles
            exlimit: 'max', // extract limit
            // imlimit: 'max', // images limit, only if prop:images enabled
            exintro: '', // only intro
            exchars: 1250 // character limit
        };


		/*** GETTERS ***/

        this.getArticleParams = function() {
			var fullParams = angular.extend(params.articleParams, params.baseParams);
			return fullParams;
		};

        this.getSearchParams = function() {
			var fullParams = angular.extend(params.searchParams, params.baseParams);
			return fullParams;
		};

        this.getApiUrl = function() {
            var apiUrl = 'http://' + params.lang + '.' + params.domain + '.org/w/api.php';
            if (params.domain == 'commons') apiUrl = 'http://commons.wikimedia.org/w/api.php';
            return apiUrl;
        }; // getApiUrl


		/*** SETTERS ***/

        this.setSearchTerm = function(term) {
			params.searchTerm = term;
			params.searchParams.gsrsearch = params.searchFilter + term;
		};

        this.setArticleTitle = function(newName) {
			params.articleParams.titles = newName;
		};


        /*** LOAD and SAVE ***/

		params.saveSettings = function() {
			localStorage.wikiSearchTerm = params.searchTerm || '';
			localStorage.wikiFilter = params.searchFilter || '';
			localStorage.wikiLang = params.lang || '';
			localStorage.wikiMaxResult = params.searchParams.gsrlimit || '';
			localStorage.wikiDomain = params.domain || '';
		}; // saveSettings

		params.loadSettings = function() {
			params.lang = localStorage.wikiLang || params.lang;
			params.searchParams.gsrlimit = Number(localStorage.wikiMaxResult || params.searchParams.gsrlimit);
			params.domain = localStorage.wikiDomain || params.domain;
			params.searchTerm = localStorage.wikiSearchTerm || params.searchTerm;
			params.searchFilter = localStorage.wikiFilter || params.searchFilter;
			if (localStorage.wikiFilter === '') params.searchFilter = '';
		}; // loadSettings


	} // Params

})();
