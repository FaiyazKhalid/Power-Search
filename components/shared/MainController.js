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
		ParamService.updateSearchTerm();
		utils.updatePath(ParamService.getSearchTerm());

		if (ParamService.isCommons()) {
			ImagesService.search();
			MainImageService.open();
		} else {
			PagesService.search(openExactPage);
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

	mainControl.loadMore = function () {
		PagesService.loadMore();
	};	// loadMore


	/*** PRIVATE FUNCTIONS ***/

	function openExactPage() {
	  PageService.open(ParamService.getPageTitle());
  	}	// openExactPage

	function clearResults() {
		PageService.clearResults();
        PagesService.clearResults();
		ImagesService.clearResults();
		MainImageService.clearResults();
	} // clearResults

} // MainController

module.exports = MainController;
