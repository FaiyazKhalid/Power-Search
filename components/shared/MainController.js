'use strict';
function MainController($window, utils, ParamsService, PageService, PagesService, ImagesService, MainImageService) {

	var mainControl = this;


	/*** PUBLIC METHODS ***/

	mainControl.init = function () {
		ParamsService.loadSettings();
		if (utils.getPath()) ParamsService.setSearchTerm(utils.getPath());
		mainControl.search();
		$window.onhashchange = mainControl.init;
	}; // init

	mainControl.search = function () {
		clearResults();
		if(!ParamsService.getSearchTerm()) return;
		updateSearchTerm();

		if (ParamsService.isCommons()) {
			ImagesService.search();
			MainImageService.open();
		} else {
			PagesService.search();
			// TODO ubaciti if pages.exactMatch
			PageService.open();
		}
		ParamsService.saveSettings();
	}; // search

	mainControl.open = function (title) {
		ParamsService.setPageTitle(title);
		PageService.open();
		utils.scrollToTop(300);
	}; // open

	mainControl.selectText = function () {
		ParamsService.setSearchTerm(utils.getSelection());
	}; // selectText


	/*** PRIVATE FUNCTIONS ***/

	function updateSearchTerm() {
		ParamsService.updateSearchTerm();
		utils.setPath(ParamsService.getSearchTerm());
	}	// updateSearchTerm

	function clearResults() {
		PageService.clearResults();
        PagesService.clearResults();
		ImagesService.clearResults();
		MainImageService.clearResults();
	} // clearResults

} // MainController

module.exports = MainController;
