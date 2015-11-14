function MainController($window, $location, utils, Params, Images, Pages, Page, ImagePage) {
'use strict';

	var main = this;

	main.params = Params;
	main.page = Page;


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
		Params.updateSearchTerm();

		if (Params.isCommons()) {
			Images.search();
			ImagePage.open();
		} else {
			Pages.search();
			// TODO ubaciti if pages.exactMatch
			Page.open();
		}
		Params.saveSettings();
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
		Page.clearResults();
        Pages.clearResults();
		Images.clearResults();
		ImagePage.clearResults();
	} // clearResults

	function getPathTerm() {
		main.params.settings.searchTerm = $location.path().substr(1) || main.params.settings.searchTerm;
	}

	function setPathTerm() {
		$location.path(searchTerm());
	}


} // MainController

module.exports = MainController;
