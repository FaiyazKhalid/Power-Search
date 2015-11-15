function MainController($window, $location, utils, Params, Images, Pages, Page, ImagePage) {
'use strict';

	var main = this;

	main.params = Params;
	main.page = Page;


	/*** PUBLIC METHODS ***/

	main.init = function () {
		Params.loadSettings();
		if (utils.getPath()) Params.setSearchTerm(utils.getPath());
		main.search();
		$window.onhashchange = main.init;
	}; // init

	main.search = function () {
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

	main.open = function (title) {
		Params.setPageTitle(title);
		Page.open();
		utils.scrollToTop(300);
	}; // open

	main.selectText = function () {
		var text = $window.getSelection().toString();
		Params.setSearchTerm(text);
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
