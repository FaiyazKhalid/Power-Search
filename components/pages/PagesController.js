function PagesController(PagesService, PageService, ParamService, utils) {
'use strict';

	var self = this;
	self.pages = PagesService;
	self.page = PageService;
	self.params = ParamService;

	self.isSelectedPage = function(page) {
		if(PageService.isExist()) return (page.title == PageService.getTitle());
	};	// isSelectedPage

	self.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText

	self.toggleHide = function () {
		return ParamService.pageLarge ? 'hidden' : '';
	}; // toggleHide

	self.showLoadMore = function () {
		return self.pages.results && PagesService.showLoadMore;
	};

	self.loadMore = function () {
		PagesService.loadMore();
	};	// loadMore


} // PagesController

module.exports = PagesController;
