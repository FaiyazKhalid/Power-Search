'use strict';
function MainController($window, utils, ParamService, MainPageService, PagesService, ImagesService, MainImageService) {

	var self = this;


	/*** PUBLIC METHODS ***/

	self.init = function () {
		ParamService.loadSettings();
		if (utils.getPath()) ParamService.setSearchTerm(utils.getPath());
		self.search();
		$window.onhashchange = self.init;
	}; // init

	self.search = function () {
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

	self.open = function (title) {
		ParamService.setPageTitle(title);
		MainPageService.open();
		utils.scrollToTop(300);
	}; // open

	self.selectText = function () {
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
