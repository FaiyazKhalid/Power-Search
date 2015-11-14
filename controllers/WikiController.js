function WikiController($window, $location, utils, Projects, Params, Images, Pages, Page) {
'use strict';

	var wiki = this;

	wiki.params = Params;
	wiki.page = Page;
	wiki.pages = Pages;
	wiki.images = Images;
	wiki.projects = Projects.getProjects();
	wiki.leadLarge = false;


	/*** PUBLIC METHODS ***/

	wiki.init = function () {
		Params.loadSettings();
		getPathTerm();
		wiki.search();
		$window.onhashchange = wiki.init;
	}; // init

	wiki.search = function () {
		clearResults();
		if(!searchTerm()) return;
		setPathTerm();
		Params.saveSettings();

		if (Params.isCommons()) {
			Images.search();
		} else {
			Pages.search();
			// TODO ubaciti if pages.exactMatch
			Page.open();
		}

	}; // search

	wiki.open = function (title) {
		Params.setPageTitle(title);
		Page.open();
		utils.scrollToTop(300);
	}; // open

	wiki.searchForLeadTerm = function () {
		setSearchTerm(wiki.page.page.title);
		wiki.search();
		wiki.toggleLeadLarge();
	}; // searchForLeadTerm

	wiki.toggleLeadLarge = function () {
		wiki.leadLarge = !wiki.leadLarge;
	}; // toggleLeadLarge

	wiki.selectText = function () {
		var text = $window.getSelection().toString();
		Params.setSearchTerm(text);
	}; // selectText

	wiki.isSelectedPage = function(page) {
		if(wiki.page.page) return page.title == wiki.page.page.title;
	};	// isSelectedPage


	/*** PRIVATE FUNCTIONS ***/

	function searchTerm() {
		return wiki.params.settings.searchTerm;
	}

	function setSearchTerm(newTerm) {
		Params.setSearchTerm(newTerm);
		setPathTerm();
	}	// setSearchTerm

	function clearResults() {
        Pages.clearResults();
		Page.clearResults();
		Images.clearResults();
	} // clearResults

	function getPathTerm() {
		wiki.params.settings.searchTerm = $location.path().substr(1) || wiki.params.settings.searchTerm;
	}

	function setPathTerm() {
		$location.path(searchTerm());
	}


} // WikiController

module.exports = WikiController;
