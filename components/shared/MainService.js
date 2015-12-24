'use strict';

function MainService(ParamService, MainPageService, PagesService, ImagesService, MainImageService, utils) {

    var service = this;

    service.clearResults = function() {
        MainPageService.clearResults();
        PagesService.clearResults();
        ImagesService.clearResults();
        MainImageService.clearResults();
    }; // clearResults

    service.search = function () {
		service.clearResults();
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

    service.open = function (title) {
		ParamService.setPageTitle(title);
		MainPageService.open();
		utils.scrollToTop(300);
	}; // open

    /*** PRIVATE ***/

    function openExactPage() {
      MainPageService.open(ParamService.getPageTitle());
    }	// openExactPage

} // MainService


module.exports = MainService;
