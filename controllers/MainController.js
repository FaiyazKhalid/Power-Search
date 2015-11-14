function MainController($window, $location, utils, Projects, Params, Images, Pages, Page) {
'use strict';

	var main = this;

	main.params = Params;
	main.page = Page;
	main.pages = Pages;
	main.images = Images;
	main.projects = Projects.getProjects();
	main.leadLarge = false;


	/*** PUBLIC METHODS ***/

	main.init = function () {
		Params.loadSettings();
		getPathTerm();
		main.search();
		$window.onhashchange = main.init;
	}; // init

	main.search = function () {
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

	main.open = function (title) {
		Params.setPageTitle(title);
		Page.open();
		utils.scrollToTop(300);
	}; // open

	main.searchForLeadTerm = function () {
		setSearchTerm(main.page.page.title);
		main.search();
		main.toggleLeadLarge();
	}; // searchForLeadTerm

	main.toggleLeadLarge = function () {
		main.leadLarge = !main.leadLarge;
	}; // toggleLeadLarge

	main.selectText = function () {
		var text = $window.getSelection().toString();
		Params.setSearchTerm(text);
	}; // selectText

	main.isSelectedPage = function(page) {
		if(main.page.page) return page.title == main.page.page.title;
	};	// isSelectedPage


	/*** PRIVATE FUNCTIONS ***/

	function searchTerm() {
		return main.params.settings.searchTerm;
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
		main.params.settings.searchTerm = $location.path().substr(1) || main.params.settings.searchTerm;
	}

	function setPathTerm() {
		$location.path(searchTerm());
	}


} // MainController

module.exports = MainController;
