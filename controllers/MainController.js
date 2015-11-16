'use strict';
function MainController($window, utils, Params, Page, Pages, Images, ImagePage) {

	var mainControl = this;


	/*** PUBLIC METHODS ***/

	mainControl.init = function () {
		Params.loadSettings();
		if (utils.getPath()) Params.setSearchTerm(utils.getPath());
		mainControl.search();
		$window.onhashchange = mainControl.init;
	}; // init

	mainControl.search = function () {
		clearResults();
		if(!Params.getSearchTerm()) return;
		updateSearchTerm();

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

	mainControl.open = function (title) {
		Params.setPageTitle(title);
		Page.open();
		utils.scrollToTop(300);
	}; // open

	mainControl.selectText = function () {
		Params.setSearchTerm(utils.getSelection());
	}; // selectText


	/*** PRIVATE FUNCTIONS ***/

	function updateSearchTerm() {
		Params.updateSearchTerm();
		utils.setPath(Params.getSearchTerm());
	}	// updateSearchTerm

	function clearResults() {
		Page.clearResults();
        Pages.clearResults();
		Images.clearResults();
		ImagePage.clearResults();
	} // clearResults

} // MainController

module.exports = MainController;
