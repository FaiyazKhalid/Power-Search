function PagesController(PagesService, MainPageService, ParamService, utils) {
'use strict';

	var ctrl = this;
	ctrl.page = MainPageService;
	ctrl.params = ParamService;

	ctrl.pagesService = PagesService;
	ctrl.mainPageService = MainPageService;
	ctrl.paramService = ParamService;

	ctrl.isSelectedPage = function(page) {
		if(MainPageService.isExist()) return (page.title == MainPageService.getTitle());
	};	// isSelectedPage

	ctrl.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText

	ctrl.toggleHide = function () {
		return ParamService.pageLarge ? 'hidden' : '';
	}; // toggleHide

	ctrl.showLoadMore = function () {
		return ctrl.pagesService.results && PagesService.showLoadMore;
	};

	ctrl.loadMore = function () {
		PagesService.loadMore();
	};	// loadMore


} // PagesController

module.exports = PagesController;
