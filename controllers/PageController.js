function PageController(Page) {
'use strict';

	var pageControl = this;
	pageControl.page = Page;
	pageControl.pageLarge = false;

	pageControl.toggleLeadLarge = function () {
		pageControl.pageLarge = !pageControl.pageLarge;
	}; // toggleLeadLarge


} // PageController

module.exports = PageController;
