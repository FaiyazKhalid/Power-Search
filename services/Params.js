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
			autosave: false
		};

		// basic api params
        params.basic = {
            action: 'query',
            prop: 'extracts|pageimages|info|redirects', // |images| return all images from page
            //pithumbsize: 200,	// thumb size (height?)
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
		};

        this.getSearchParams = function() {
			var fullParams = angular.extend(params.search, params.basic);
			return fullParams;
		};

        this.getApiUrl = function() {
            var apiUrl = 'http://' + params.settings.lang + '.' + params.settings.domain + '.org/w/api.php';
            if (params.settings.domain == 'commons') apiUrl = 'http://commons.wikimedia.org/w/api.php';
            return apiUrl;
        }; // getApiUrl


		/*** SETTERS ***/

        this.updateSearchTerm = function() {
			params.search.gsrsearch = params.settings.searchFilter + params.settings.searchTerm;
		};

        this.setArticleTitle = function(newName) {
			params.article.titles = newName;
		};


        /*** STORAGE ***/

		params.saveSettings = function() {
			if(params.settings.autosave) {
				localStorage.wikiSettings = JSON.stringify(params.settings);
			}
		}; // saveSettings

		params.loadSettings = function() {
			if(localStorage.wikiSettings) {
				params.settings = JSON.parse(localStorage.wikiSettings);
			}
		}; // loadSettings

		params.resetSettings = function () {
			for(var param in params.settings) {
				params.settings[param] = null;
			}
			params.deleteStorage();
		}; // resetSettings

		params.deleteStorage = function () {
			localStorage.removeItem("wikiSettings");
		}; // deleteSettings

	} // Params

})();
