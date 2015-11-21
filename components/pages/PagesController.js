function PagesController(PagesService, PageService, ParamsService, utils) {
'use strict';

	var pagesControl = this;
	pagesControl.pages = PagesService;
	pagesControl.page = PageService;
	pagesControl.params = ParamsService;

	pagesControl.isSelectedPage = function(page) {
		if(PageService.isExist()) return (page.title == PageService.getTitle());
	};	// isSelectedPage

	pagesControl.selectText = function () {
		ParamsService.setSearchTerm(utils.getSelection());
	}; // selectText

	pagesControl.toggleHide = function () {
		return ParamsService.pageLarge ? 'hidden' : 'col-md-6 col-md-pull-6';
	}; // toggleHide



} // PagesController

module.exports = PagesController;
