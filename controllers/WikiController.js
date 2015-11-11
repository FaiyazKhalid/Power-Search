function WikiController(Api, $window, $location, utils, Projects, Params, Languages, Images, Pages) {
'use strict';

	var wiki = this;

	wiki.api = Api;
	wiki.params = Params;
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

		if(wiki.isCommons()) {
			Images.search();
		}
		else Pages.search();
	}; // search

	wiki.open = function (title) {
		resetLeadArticle();
		utils.scrollToTop(300);
		Params.setArticleTitle(title);
		Api.open();
	}; // open

	wiki.searchForLeadTerm = function () {
		updateSearchTerm(wiki.api.page.title);
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

	wiki.isCommons = function() {
		return Params.isCommons();
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

	wiki.searchClass = function () {
		if(wiki.isCommons()) {
			return 'col-md-12';
		}
		return wiki.leadLarge ? 'hidden' : 'col-md-6 col-md-pull-6';
	};

	wiki.leadClass = function () {
		if(wiki.isCommons()) {
			return 'hidden';
		}
		return wiki.leadLarge ? 'col-md-12' : 'col-md-6 col-md-push-6';
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
		wiki.api.page = '';
	}	// resetLeadArticle

	function resetErrors() {
		wiki.api.error = "";
		wiki.languages.error = "";
	}	// resetErrors

	function resetResults() {
		resetErrors();
		wiki.api.results = null;
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
