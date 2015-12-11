function PagesController(PagesService, MainPageService, ParamService, utils) {
'use strict';

	var self = this;
	self.pages = PagesService;
	self.page = MainPageService;
	self.params = ParamService;

	self.isSelectedPage = function(page) {
		if(MainPageService.isExist()) return (page.title == MainPageService.getTitle());
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
