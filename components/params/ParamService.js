'use strict';

function ParamService(utils) {

    var params = this;
    var thumbSize = utils.isDesktop() ? 250 : 150;
    var leadImageSize = 400;
    params.searchFilters = ['intitle:', '', 'prefix:'];
    params.pageLarge = false;

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

    params.mainImage = {
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
        pithumbsize: thumbSize,
        iiprop: 'extmetadata',
        iiextmetadatafilter: 'ImageDescription' // filter extmetadata (author, licence...)
    };


    /*** GETTERS ***/

    params.getSearchTerm = function() {
        return params.settings.searchTerm;
    };

    params.getPageTitle = function() {
        return params.page.titles;
    }; // getPageTitle

    params.getLang = function () {
        return params.settings.lang;
    };

    params.getDomain = function () {
        return params.settings.domain;
    };

    params.getApiUrl = function() {
        if (params.settings.domain == 'commons') {
            return 'http://commons.wikimedia.org/w/api.php';
        }
        return 'http://' + params.settings.lang + '.' + params.settings.domain + '.org/w/api.php';
    }; // getApiUrl

    params.createParamUrl = function(chosenParams) {
		var paramUrl = params.getApiUrl() + '?' + utils.serialize(chosenParams);
		return paramUrl;
	}; // createParamUrl

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
		return angular.extend(params.mainImage, params.page, params.basic);
	}; // getImagePageParams


    /*** SETTERS ***/

    params.updateSearchTerm = function () {
        var filter = params.settings.searchFilter;
        var term = utils.capitalize(params.settings.searchTerm);
        params.basicSearch.gsrsearch = filter + term;
        params.page.titles = term;
        params.mainImage.titles = term;
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

    params.setOffset = function (x) {
        params.basicSearch.gsroffset = x;
    };  // setOffset


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

} // ParamService


module.exports = ParamService;
