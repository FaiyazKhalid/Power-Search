function PagesController(Pages, Page) {
'use strict';

	var pagesControl = this;
	pagesControl.pages = Pages;
	pagesControl.page = Page;

	pagesControl.isSelectedPage = function(page) {
		if(Page.isExist()) return (page.title == Page.getTitle());
	};	// isSelectedPage


} // PagesController

module.exports = PagesController;
