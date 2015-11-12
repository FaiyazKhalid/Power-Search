function WikiController($window, $location, utils, Projects, Params, Languages, Images, Pages, Lead) {
'use strict';

	var wiki = this;

	wiki.params = Params;
	wiki.lead = Lead;
	wiki.pages = Pages;
	wiki.languages = Languages;
	wiki.images = Images;
	wiki.projects = Projects.getProjects();
	wiki.leadLarge = false;


	/*** PUBLIC METHODS ***/

	wiki.init = function () {
		Params.loadSettings();
		Languages.get();
		getPathTerm();
		wiki.search();
		$window.onhashchange = wiki.init;
	}; // init

	wiki.search = function () {
		resetResults();
		if(!searchTerm()) return;
		updateSearchTerm();
		Params.saveSettings();
		if(Params.isCommons()) return Images.search();
		Pages.search();
		// TODO ubaciti if pages.exactMatch
		Lead.open();
	}; // search

	wiki.open = function (title) {
		resetLeadArticle();
		utils.scrollToTop(300);
		Params.setArticleTitle(title);
		Lead.open();
	}; // open

	wiki.searchForLeadTerm = function () {
		updateSearchTerm(wiki.lead.page.title);
		wiki.search();
		wiki.toggleLeadLarge();
	}; // searchForLeadTerm

	wiki.toggleLeadLarge = function () {
		wiki.leadLarge = !wiki.leadLarge;
	}; // toggleLeadLarge

	wiki.selectText = function () {
		var text = $window.getSelection().toString();
		setSearchTerm(text);
	}; // selectText

	wiki.resetAndReload = function() {
		resetSearchTerm();
		$window.location.reload();
	};	// resetAndReload

	wiki.isSelectedPage = function(page) {
		return page.title == wiki.lead.page.title;
	};	// isSelectedPage

	wiki.refreshLanguages = function() {
		Languages.get();
	};


	/*** PRIVATE FUNCTIONS ***/

	function searchTerm() {
		return wiki.params.settings.searchTerm;
	}

	function setSearchTerm(term) {
		wiki.params.settings.searchTerm = term;
	}

	function updateSearchTerm(newTerm) {
		if(newTerm) setSearchTerm(newTerm);
		setPathTerm();
		Params.setFilterAndTerm();
		Params.setArticleTitle(searchTerm());
	}	// updateSearchTerm

	function resetSearchTerm() {
		setSearchTerm('');
		resetPath();
	}

	function resetLeadArticle(){
		wiki.lead.page = '';
	}	// resetLeadArticle

	function resetErrors() {
		wiki.pages.error = "";
		wiki.languages.error = "";
	}	// resetErrors

	function resetResults() {
		resetErrors();
		wiki.pages.results = null;
		resetLeadArticle();
		wiki.images.clearResults();
	} // resetResults

	function getPathTerm() {
		wiki.params.settings.searchTerm = $location.path().substr(1) || wiki.params.settings.searchTerm;
	}

	function setPathTerm() {
		$location.path(searchTerm());
	}

	function resetPath() {
		$location.path("");
	}

} // WikiController

module.exports = WikiController;
