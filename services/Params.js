'use strict';

function Params() {

    var params = this;
    var leadImageSize = 250;
    var thumbSize = 200;
    params.searchFilters = ['intitle:', '', 'prefix:'];

    // default user settings
    params.settings = {
        lang: 'en',
        domain: 'wikipedia',
        searchTerm: '',
        searchFilter: params.searchFilters[0],
        orderBy: '',
        remember: false
    };

    // basic api params
    params.basic = {
        action: 'query',
        inprop: 'url', // return page url
        redirects: '', // automatically resolve redirects
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };

    params.page = {
        prop: 'extracts|pageimages|info', // |images| return all images from page
        pithumbsize: leadImageSize, // height
        titles: ''
    };

    params.basicSearch = {
        generator: 'search',
        gsrlimit: 20, // broj rezultata, max 50
        gsrsearch: '' // searchTerm + searchFilter
    };

    params.pages = {
        prop: 'extracts|pageimages|info|redirects', // |images| return all images from page
        gsrnamespace: 0, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: 50, // thumb height
        exlimit: 'max', // extract limit
        rdlimit: 'max', // redirects limit
        // imlimit: 'max', // images limit, only if prop:images enabled
        exintro: '', // only intro
        exchars: 1250 // character limit
    };

	params.images = {
        prop: 'pageimages|info|imageinfo',
        gsrnamespace: 6, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: thumbSize,	// thumb height
        iiprop: 'extmetadata'
    };


    /*** GETTERS ***/

    params.getArticleParams = function() {
		updateSearchTerm();
        return angular.extend(params.page, params.basic);
    }; // getArticleParams

    params.getSearchParams = function() {
		updateSearchTerm();
        return angular.extend(params.pages, params.basic, params.basicSearch);
    }; // getSearchParams

	params.getImageParams = function() {
		updateSearchTerm();
		return angular.extend(params.images, params.basic, params.basicSearch);
	};

    params.getApiUrl = function() {
        if (params.settings.domain == 'commons') {
            return 'http://commons.wikimedia.org/w/api.php';
        }
        return 'http://' + params.settings.lang + '.' + params.settings.domain + '.org/w/api.php';
    }; // getApiUrl

    /*** SETTERS ***/

    params.setSearchTerm = function(term) {
        params.settings.searchTerm = term;
    };

    params.setArticleTitle = function(newName) {
        params.page.titles = newName;
    }; // setArticleTitle

    params.setLanguage = function(lang) {
        params.settings.lang = lang;
    };

    params.isCommons = function() {
        return params.settings.domain == 'commons';
    }; // isCommons


    /*** STORAGE ***/

    params.saveSettings = function() {
        if (params.settings.remember) {
            localStorage.wikiSettings = JSON.stringify(params.settings);
            localStorage.searchParams = JSON.stringify(params.pages);
        }
    }; // saveSettings

    params.loadSettings = function() {
        if (localStorage.wikiSettings) params.settings = JSON.parse(localStorage.wikiSettings);
        if (localStorage.searchParams) params.pages = JSON.parse(localStorage.searchParams);
    }; // loadSettings

    params.deleteStorage = function() {
        localStorage.removeItem("wikiSettings");
        localStorage.removeItem("searchParams");
    }; // deleteSettings

    params.toggleSave = function() {
        if (params.settings.remember) {
            params.saveSettings();
            return;
        }
        params.deleteStorage();
    }; // toggleSave


    /*** HELPERS ***/

	function updateSearchTerm() {
        params.basicSearch.gsrsearch = params.settings.searchFilter + params.settings.searchTerm;
		params.page.titles = params.settings.searchTerm;
		if (params.isCommons() && params.settings.searchFilter == 'prefix:') {
			params.basicSearch.gsrsearch = params.settings.searchFilter + 'File:' + params.settings.searchTerm;
		}
    }	// adjustForCommons

} // Params


module.exports = Params;
