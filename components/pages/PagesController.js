function PagesController(PagesService, PageService, ParamService, utils) {
'use strict';

	var pagesControl = this;
	pagesControl.pages = PagesService;
	pagesControl.page = PageService;
	pagesControl.params = ParamService;

	pagesControl.isSelectedPage = function(page) {
		if(PageService.isExist()) return (page.title == PageService.getTitle());
	};	// isSelectedPage

	pagesControl.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText

	pagesControl.toggleHide = function () {
		return ParamService.pageLarge ? 'hidden' : 'half-width';
	}; // toggleHide

	pagesControl.showLoadMore = function () {
		return PagesService.showLoadMore;
	};

	pagesControl.loadMore = function () {
		PagesService.loadMore();
	};	// loadMore


} // PagesController

module.exports = PagesController;
