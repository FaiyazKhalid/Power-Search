function WikiController(Api, $window, $location, utils, Projects, Params, Languages) {
'use strict';

	var wiki = this;

	wiki.api = Api;
	wiki.params = Params;
	wiki.languages = Languages;
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
		wiki.updateSearchTerm();
		Api.search();
		Params.saveSettings();
	}; // search

	wiki.open = function (title) {
		resetLeadArticle();
		utils.scrollToTop(300);
		Params.setArticleTitle(title);
		Api.open();
	}; // open

	wiki.searchForLeadTerm = function () {
		wiki.updateSearchTerm(wiki.api.page.title);
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

	wiki.checkMaxResults = function () {
		if (wiki.params.search.gsrlimit > 50) wiki.params.search.gsrlimit = 50;
	}; // checkMaxResults

	wiki.resetAndReload = function() {
		resetSearchTerm();
		$window.location.reload();
	};	// resetAndReload

	wiki.toggleSave = function() {
		Params.toggleSave();
	};	// toggleRemember

	wiki.updateSearchTerm = function(newTerm) {
		if(newTerm) setSearchTerm(newTerm);
		setPathTerm();
		Params.setFilteredTerm();
		Params.setArticleTitle(searchTerm());
	};	// updateSearchTerm

	wiki.isCommons = function() {
		return wiki.params.settings.domain == 'commons';
	};	// isCommons

	wiki.isSelectedProject = function(project) {
		return wiki.params.settings.domain == project.name;
	};	// isChosenProject

	wiki.isSelectedPage = function(page) {
		return page.title == wiki.api.page.title;
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

	function resetSearchTerm() {
		setSearchTerm('');
		resetPath();
	}

	function resetLeadArticle(){
		wiki.api.page = '';
	}	// resetLeadArticle

	function resetError() {
		wiki.api.error = "";
	}	// resetError

	function resetResults() {
		resetError();
		wiki.api.results = null;
		resetLeadArticle();
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
