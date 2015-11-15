function PageController(Page, Params, Pages, utils) {
'use strict';

	var pageControl = this;
	pageControl.page = Page;
	pageControl.params = Params;
	pageControl.pageLarge = false;

	pageControl.toggleLeadLarge = function () {
		pageControl.pageLarge = !pageControl.pageLarge;
	}; // toggleLeadLarge

	pageControl.searchForThisTerm = function (title) {
		setSearchTerm(title);
		Pages.search();
		pageControl.toggleLeadLarge();
	}; // searchForThisTerm

	function setSearchTerm(newTerm) {
		Params.setSearchTerm(newTerm);
		utils.setPath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
