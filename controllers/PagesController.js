function PagesController(Pages, Page, Params) {
'use strict';

	var pagesControl = this;
	pagesControl.pages = Pages;
	pagesControl.page = Page;
	pagesControl.params = Params;

	pagesControl.isSelectedPage = function(page) {
		if(Page.isExist()) return (page.title == Page.getTitle());
	};	// isSelectedPage


} // PagesController

module.exports = PagesController;
