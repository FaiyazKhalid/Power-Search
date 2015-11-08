(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('Params', Params);

	function Params() {

		var params = this;
		params.filters = ['intitle:', '', 'prefix:'];

        // default user settings
		params.settings = {
			lang: 'en',
			domain: 'wikipedia',
			searchTerm: '',
			searchFilter: params.filters[0],
			orderBy: '',
			remember: false
		};

		// basic api params
        params.basic = {
            action: 'query',
            prop: 'extracts|pageimages|info|redirects', // |images| return all images from page
            pithumbsize: 50,	// thumb height
            inprop: 'url', // return article url
            redirects: '', // automatically resolve redirects
            format: 'json',
            formatversion: 2,
            callback: 'JSON_CALLBACK'
        };

        params.article = {
            titles: ''
        };

        params.search = {
            generator: 'search',
            gsrsearch: '',  // searchTerm + searchFilter
            gsrnamespace: 0, // 0 article, 6 file
            gsrlimit: 20, // broj rezultata, max 50
            pilimit: 'max', // thumb image for all articles
            exlimit: 'max', // extract limit
			rdlimit: 'max',	// redirects limit
            // imlimit: 'max', // images limit, only if prop:images enabled
            exintro: '', // only intro
            exchars: 1250 // character limit
        };


		/*** GETTERS ***/

        this.getArticleParams = function() {
			var fullParams = angular.extend(params.article, params.basic);
			return fullParams;
		};	// getArticleParams

        this.getSearchParams = function() {
			adjustForCommons();
			return angular.extend(params.search, params.basic);
		};	// getSearchParams

        this.getApiUrl = function() {
			if (params.settings.domain == 'commons') {
				return 'http://commons.wikimedia.org/w/api.php';
			}
            return 'http://' + params.settings.lang + '.' + params.settings.domain + '.org/w/api.php';
        }; // getApiUrl


		/*** SETTERS ***/

        this.setFilteredTerm = function() {
			if (isPrefixOnCommons()) {
				setPrefixedCommonsTerm();
				return;
			}
			params.search.gsrsearch = params.settings.searchFilter + params.settings.searchTerm;
		};	// setFilteredTerm

        this.setArticleTitle = function(newName) {
			params.article.titles = newName;
		};	// setArticleTitle


        /*** STORAGE ***/

		params.saveSettings = function() {
			if(params.settings.remember) {
				localStorage.wikiSettings = JSON.stringify(params.settings);
				localStorage.searchParams = JSON.stringify(params.search);
			}
		}; // saveSettings

		params.loadSettings = function() {
			if(localStorage.wikiSettings) params.settings = JSON.parse(localStorage.wikiSettings);
			if (localStorage.searchParams) params.search = JSON.parse(localStorage.searchParams);
		}; // loadSettings

		params.deleteStorage = function () {
			localStorage.removeItem("wikiSettings");
			localStorage.removeItem("searchParams");
		}; // deleteSettings

		params.toggleSave = function () {
			if(params.settings.remember) {
				params.saveSettings();
				return;
			}
			params.deleteStorage();
		}; // toggleSave


		/*** HELPERS ***/

		function adjustForCommons() {
			if (params.settings.domain == 'commons') {
				params.search.gsrnamespace = 6;
				params.basic.pithumbsize = 200;
			}
			else {
				params.search.gsrnamespace = 0;
				params.basic.pithumbsize = 50;
			}
		}	// adjustForCommons

		function isPrefixOnCommons() {
			return (params.settings.domain == 'commons') && (params.settings.searchFilter == 'prefix:');
		}

		function setPrefixedCommonsTerm() {
			params.search.gsrsearch = params.settings.searchFilter + 'File:' + params.settings.searchTerm;
		}


	} // Params

})();
