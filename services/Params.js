'use strict';

function Params(utils) {

    var params = this;
    var thumbSize = 200;
    var leadImageSize = 400;
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

    // basic api params for all
    params.basic = {
        action: 'query',
        inprop: 'url', // return page url
        redirects: '', // automatically resolve redirects
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };

    // basic params for pages and images
    params.basicSearch = {
        generator: 'search',
        gsrsearch: '', // searchTerm + searchFilter
        gsrlimit: 20, // broj rezultata, max 50
        gsroffset: 0,   // starts from the first result (for pagination)
        continue: "gsroffset||" // continue the query
    };

    params.page = {
        titles: '',
        prop: 'extracts|pageimages|info',
        pithumbsize: leadImageSize // height
    };

    params.imagepage = {
        exintro: '', // only intro
        exchars: 250 // character limit
    };

    params.pages = {
        prop: 'extracts|pageimages|info|redirects',
        gsrnamespace: 0, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: 50, // thumb height
        exlimit: 'max', // extract limit
        rdlimit: 'max', // redirects limit
        // imlimit: 'max', // images limit, if prop:images enabled
        exintro: '', // only intro
        exchars: 1250 // character limit
    };

	params.images = {
        prop: 'pageimages|imageinfo|info|redirects',
        gsrnamespace: 6, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: thumbSize,	// thumb height
        iiprop: 'extmetadata',
        iiextmetadatafilter: 'ImageDescription' // if empty return all extmetadata (author, licence...)
    };


    /*** GETTERS ***/

    params.getSearchTerm = function() {
        return params.settings.searchTerm;
    };

    params.getApiUrl = function() {
        if (params.settings.domain == 'commons') {
            return 'http://commons.wikimedia.org/w/api.php';
        }
        return 'http://' + params.settings.lang + '.' + params.settings.domain + '.org/w/api.php';
    }; // getApiUrl

    params.getPageParams = function() {
        return angular.extend(params.page, params.basic);
    }; // getPageParams

    params.getPagesParams = function() {
        return angular.extend(params.pages, params.basic, params.basicSearch);
    }; // getPagesParams

    params.getImageParams = function() {
		return angular.extend(params.images, params.basic, params.basicSearch);
	}; // getImageParams

    params.getImagePageParams = function() {
		return angular.extend(params.imagepage, params.page, params.basic);
	}; // getImagePageParams


    /*** SETTERS ***/

    params.updateSearchTerm = function () {
        var filter = params.settings.searchFilter;
        var term = utils.capitalize(params.settings.searchTerm);
        params.basicSearch.gsrsearch = filter + term;
        params.page.titles = term;
        params.imagepage.titles = term;
        if (params.isCommons() && filter == 'prefix:') {
            params.basicSearch.gsrsearch = filter + 'File:' + term;
        }
    };  // updateSearchTerm

    params.setSearchTerm = function(term) {
        params.settings.searchTerm = term;
    };

    params.setPageTitle = function(newName) {
        params.page.titles = newName;
    }; // setPageTitle

    params.setLanguage = function(lang) {
        params.settings.lang = lang;
    };  // setLanguage


    /*** HELPERS ***/

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

} // Params


module.exports = Params;
