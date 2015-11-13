function WikiController($window, $location, utils, Projects, Params, Images, Pages, Lead) {
'use strict';

	var wiki = this;

	wiki.params = Params;
	wiki.lead = Lead;
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
			Lead.open();
		}

	}; // search

	wiki.open = function (title) {
		Params.setArticleTitle(title);
		Lead.open();
		utils.scrollToTop(300);
	}; // open

	wiki.searchForLeadTerm = function () {
		setSearchTerm(wiki.lead.page.title);
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
		if(wiki.lead.page) return page.title == wiki.lead.page.title;
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
		Lead.clearResults();
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
