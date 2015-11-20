function PageController(PageService, ParamsService, PagesService, LanguagesService, utils) {
'use strict';

	var pageControl = this;
	pageControl.page = PageService;
	pageControl.params = ParamsService;
	pageControl.languages = LanguagesService;

	/* METHODS */

	pageControl.searchForThisTerm = function (title) {
		setSearchTerm(title);
		PagesService.search();
		pageControl.toggleLeadLarge();
	}; // searchForThisTerm

	pageControl.toggleFullWidth = function () {
		return ParamsService.pageLarge ? 'col-md-12' : 'col-md-6 col-md-push-6';
	}; // selectText

	pageControl.toggleLeadLarge = function () {
		ParamsService.pageLarge = !ParamsService.pageLarge;
	}; // toggleLeadLarge


	/* HELPERS */

	function setSearchTerm(newTerm) {
		ParamsService.setSearchTerm(newTerm);
		utils.setPath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
