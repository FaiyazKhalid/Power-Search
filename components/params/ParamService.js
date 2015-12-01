'use strict';

function ParamService(utils) {

    var self = this;
    var thumbSize = utils.isDesktop() ? 250 : 150;
    var leadImageSize = 400;
    self.searchFilters = ['intitle:', '', 'prefix:'];
    self.pageLarge = false;

    // default user settings
    self.settings = {
        lang: 'en',
        domain: 'wikipedia',
        searchTerm: '',
        searchFilter: self.searchFilters[0],
        orderBy: '',
        numResults: 20,
        remember: false
    };

    // basic api self for all
    self.basic = {
        action: 'query',
        inprop: 'url', // return page url
        redirects: '', // automatically resolve redirects
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };

    // basic self for pages and images
    self.basicSearch = {
        generator: 'search',
        gsrsearch: '', // searchTerm + searchFilter
        gsrlimit: 20, // broj rezultata, max 50
        gsroffset: 0,   // starts from the first result (for pagination)
        continue: "gsroffset||" // continue the query
    };

    self.page = {
        titles: '',
        prop: 'extracts|pageimages|info',
        pithumbsize: leadImageSize // height
    };

    self.mainImage = {
        exintro: '', // only intro
        exchars: 250 // character limit
    };

    self.pages = {
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

	self.images = {
        prop: 'pageimages|imageinfo|info|redirects',
        gsrnamespace: 6, // 0: article, 6: file
        pilimit: 'max', // thumb image for all articles
        pithumbsize: thumbSize,
        iiprop: 'extmetadata',
        iiextmetadatafilter: 'ImageDescription' // filter extmetadata (author, licence...)
    };


    /*** GETTERS ***/

    self.getSearchTerm = function() {
        return self.settings.searchTerm;
    };

    self.getPageTitle = function() {
        return self.page.titles;
    }; // getPageTitle

    self.getLang = function () {
        return self.settings.lang;
    };

    self.getDomain = function () {
        return self.settings.domain;
    };

    self.getApiUrl = function() {
        if (self.settings.domain == 'commons') {
            return 'http://commons.wikimedia.org/w/api.php';
        }
        return 'http://' + self.settings.lang + '.' + self.settings.domain + '.org/w/api.php';
    }; // getApiUrl

    self.createParamUrl = function(chosenParams) {
		var paramUrl = self.getApiUrl() + '?' + utils.serialize(chosenParams);
		return paramUrl;
	}; // createParamUrl

    self.getPageParams = function() {
        return angular.extend(self.page, self.basic);
    }; // getPageParams

    self.getPagesParams = function() {
        return angular.extend(self.pages, self.basic, self.basicSearch);
    }; // getPagesParams

    self.getImageParams = function() {
		return angular.extend(self.images, self.basic, self.basicSearch);
	}; // getImageParams

    self.getImagePageParams = function() {
		return angular.extend(self.mainImage, self.page, self.basic);
	}; // getImagePageParams


    /*** SETTERS ***/

    self.updateSearchTerm = function () {
        var filter = self.settings.searchFilter;
        var term = utils.capitalize(self.settings.searchTerm);
        self.basicSearch.gsrsearch = filter + term;
        self.page.titles = term;
        self.mainImage.titles = term;
        if (self.isCommons() && filter == 'prefix:') {
            self.basicSearch.gsrsearch = filter + 'File:' + term;
        }
    };  // updateSearchTerm

    self.setSearchTerm = function(term) {
        self.settings.searchTerm = term;
    };

    self.setPageTitle = function(newName) {
        self.page.titles = newName;
    }; // setPageTitle

    self.setLanguage = function(lang) {
        self.settings.lang = lang;
    };  // setLanguage

    self.setOffset = function (x) {
        self.basicSearch.gsroffset = x;
    };  // setOffset


    /*** HELPERS ***/

    self.isCommons = function() {
        return self.settings.domain == 'commons';
    }; // isCommons


    /*** STORAGE ***/

    self.saveSettings = function() {
        if (self.settings.remember) {
            localStorage.wikiSettings = JSON.stringify(self.settings);
            localStorage.pagesParams = JSON.stringify(self.pages);
            localStorage.basicSearch = JSON.stringify(self.basicSearch);
        }
    }; // saveSettings

    self.loadSettings = function() {
        if (localStorage.wikiSettings) self.settings = JSON.parse(localStorage.wikiSettings);
        if (localStorage.pagesParams) self.pages = JSON.parse(localStorage.pagesParams);
        if (localStorage.basicSearch) self.basicSearch = JSON.parse(localStorage.basicSearch);
    }; // loadSettings

    self.deleteStorage = function() {
        localStorage.removeItem("wikiSettings");
        localStorage.removeItem("pagesParams");
        localStorage.removeItem("basicSearch");
    }; // deleteSettings

    self.toggleSave = function() {
        if (self.settings.remember) {
            self.saveSettings();
            return;
        }
        self.deleteStorage();
    }; // toggleSave

} // ParamService


module.exports = ParamService;
