function PagesController(PagesService, PageService, ParamsService) {
'use strict';

	var pagesControl = this;
	pagesControl.pages = PagesService;
	pagesControl.page = PageService;
	pagesControl.params = ParamsService;

	pagesControl.isSelectedPage = function(page) {
		if(PageService.isExist()) return (page.title == PageService.getTitle());
	};	// isSelectedPage


} // PagesController

module.exports = PagesController;
