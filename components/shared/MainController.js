'use strict';
function MainController($window, utils, ParamService, PageService, PagesService, ImagesService, MainImageService) {

	var mainControl = this;


	/*** PUBLIC METHODS ***/

	mainControl.init = function () {
		ParamService.loadSettings();
		if (utils.getPath()) ParamService.setSearchTerm(utils.getPath());
		mainControl.search();
		$window.onhashchange = mainControl.init;
	}; // init

	mainControl.search = function () {
		clearResults();
		if(!ParamService.getSearchTerm()) return;
		updateSearchTerm();

		if (ParamService.isCommons()) {
			ImagesService.search();
			MainImageService.open();
		} else {
			PagesService.search();
			// TODO ubaciti if pages.exactMatch
			PageService.open();
		}
		ParamService.saveSettings();
	}; // search

	mainControl.open = function (title) {
		ParamService.setPageTitle(title);
		PageService.open();
		utils.scrollToTop(300);
	}; // open

	mainControl.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText


	/*** PRIVATE FUNCTIONS ***/

	function updateSearchTerm() {
		ParamService.updateSearchTerm();
		utils.setPath(ParamService.getSearchTerm());
	}	// updateSearchTerm

	function clearResults() {
		PageService.clearResults();
        PagesService.clearResults();
		ImagesService.clearResults();
		MainImageService.clearResults();
	} // clearResults

} // MainController

module.exports = MainController;
