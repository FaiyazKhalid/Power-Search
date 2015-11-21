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
		return ParamService.pageLarge ? 'hidden' : 'col-md-6 col-md-pull-6';
	}; // toggleHide



} // PagesController

module.exports = PagesController;
