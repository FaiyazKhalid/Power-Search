function PageController(PageService, ParamsService, PagesService, utils) {
'use strict';

	var pageControl = this;
	pageControl.page = PageService;
	pageControl.params = ParamsService;
	pageControl.pageLarge = false;

	pageControl.toggleLeadLarge = function () {
		pageControl.pageLarge = !pageControl.pageLarge;
	}; // toggleLeadLarge

	pageControl.searchForThisTerm = function (title) {
		setSearchTerm(title);
		PagesService.search();
		pageControl.toggleLeadLarge();
	}; // searchForThisTerm

	function setSearchTerm(newTerm) {
		ParamsService.setSearchTerm(newTerm);
		utils.setPath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
