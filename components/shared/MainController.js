'use strict';
function MainController($window, utils, ParamService, MainPageService, PagesService, ImagesService, MainImageService) {

	var ctrl = this;


	/*** PUBLIC METHODS ***/

	ctrl.init = function () {
		ParamService.loadSettings();
		if (utils.getPath()) ParamService.setSearchTerm(utils.getPath());
		ctrl.search();
		$window.onhashchange = ctrl.init;
	}; // init

	ctrl.search = function () {
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

	ctrl.open = function (title) {
		ParamService.setPageTitle(title);
		MainPageService.open();
		utils.scrollToTop(300);
	}; // open

	ctrl.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText


	/*** PRIVATE FUNCTIONS ***/

	function openExactPage() {
	  MainPageService.open(ParamService.getPageTitle());
  	}	// openExactPage

	function clearResults() {
		MainPageService.clearResults();
        PagesService.clearResults();
		ImagesService.clearResults();
		MainImageService.clearResults();
	} // clearResults

} // MainController

module.exports = MainController;
