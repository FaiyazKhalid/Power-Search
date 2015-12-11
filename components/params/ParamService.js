'use strict';

function ParamService(utils) {

    var service = this;
    var thumbSize = utils.isDesktop() ? 250 : 150;
    var leadImageSize = 400;
	var defaultLang = 'en';

    service.searchFilters = ['intitle:', '', 'prefix:'];
    service.pageLarge = false;

    service.languagesUrl = "https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK";

    // interface settings
    service.settings = {
        lang: defaultLang,
        domain: 'wikipedia',
        searchTerm: '',
        searchFilter: service.searchFilters[0],
        orderBy: '',
        numResults: 20,
        remember: false
    };

    // basic wiki api settings for all
    service.basic = {
        action: 'query',
        inprop: 'url', // return page url
        redirects: '', // automatically resolve redirects
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };

    // basic wiki api settings for pages and images
    service.basicSearch = {
        generator: 'search',
        gsrsearch: '', // searchTerm + searchFilter
        gsrlimit: 20, // broj rezultata, max 50
        gsroffset: 0,   // starts from the first result (for pagination)
        continue: "gsroffset||" // continue the query
    };

    // specific settings
    service.page = {
        titles: '',
        prop: 'extracts|pageimages|info',
        pithumbsize: leadImageSize // height
    };

    service.mainImage = {
        exintro: '', // only intro
        exchars: 250 // character limit
    };

    service.pages = {
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

	service.images = {
        prop: 'pageimages|imageinfo|info|redirects',
        gsrnamespace: 6, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: thumbSize,
        iiprop: 'extmetadata',
        iiextmetadatafilter: 'ImageDescription' // filter extmetadata (author, licence...)
    };


    /*** GETTERS ***/

    service.getSearchTerm = function() {
        return service.settings.searchTerm;
    };

    service.getPageTitle = function() {
        return service.page.titles;
    }; // getPageTitle

    service.getLang = function () {
        return service.settings.lang;
    };

    service.getDomain = function () {
        return service.settings.domain;
    };

    service.getApiUrl = function() {
        if (service.settings.domain == 'commons') return 'http://commons.wikimedia.org/w/api.php';
        if (!service.settings.lang) service.settings.lang = defaultLang;
        return 'http://' + service.settings.lang + '.' + service.settings.domain + '.org/w/api.php';
    }; // getApiUrl

    service.createParamUrl = function(chosenParams) {
		var paramUrl = service.getApiUrl() + '?' + utils.serialize(chosenParams);
		return paramUrl;
	}; // createParamUrl

    service.getPageParams = function() {
        return angular.extend(service.page, service.basic);
    }; // getPageParams

    service.getPagesParams = function() {
        return angular.extend(service.pages, service.basic, service.basicSearch);
    }; // getPagesParams

    service.getImageParams = function() {
		return angular.extend(service.images, service.basic, service.basicSearch);
	}; // getImageParams

    service.getImagePageParams = function() {
		return angular.extend(service.mainImage, service.page, service.basic);
	}; // getImagePageParams


    /*** SETTERS ***/

    service.updateSearchTerm = function () {
        var filter = service.settings.searchFilter;
        var term = utils.capitalize(service.settings.searchTerm);
        service.basicSearch.gsrsearch = filter + term;
        service.page.titles = term;
        service.mainImage.titles = term;
        if (service.isCommons() && filter == 'prefix:') {
            service.basicSearch.gsrsearch = filter + 'File:' + term;
        }
    };  // updateSearchTerm

    service.setSearchTerm = function(term) {
        service.settings.searchTerm = term;
    };

    service.setPageTitle = function(newName) {
        service.page.titles = newName;
    }; // setPageTitle

    service.setLanguage = function(lang) {
        service.settings.lang = lang;
    };  // setLanguage

    service.setOffset = function (x) {
        service.basicSearch.gsroffset = x;
    };  // setOffset


    /*** HELPERS ***/

    service.isCommons = function() {
        return service.settings.domain == 'commons';
    }; // isCommons


    /*** STORAGE ***/

    service.saveSettings = function() {
        if (service.settings.remember) {
            localStorage.wikiSettings = JSON.stringify(service.settings);
            localStorage.basicSearch = JSON.stringify(service.basicSearch);
        }
    }; // saveSettings

    service.loadSettings = function() {
        if (localStorage.wikiSettings) service.settings = JSON.parse(localStorage.wikiSettings);
        if (localStorage.basicSearch) service.basicSearch = JSON.parse(localStorage.basicSearch);
    }; // loadSettings

    service.deleteStorage = function() {
        localStorage.removeItem("wikiSettings");
        localStorage.removeItem("basicSearch");
    }; // deleteSettings

    service.toggleSave = function() {
        if (service.settings.remember) {
            service.saveSettings();
            return;
        }
        service.deleteStorage();
    }; // toggleSave

} // ParamService


module.exports = ParamService;
