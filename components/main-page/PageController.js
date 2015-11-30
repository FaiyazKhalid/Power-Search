function PageController(PageService, ParamService, PagesService, LanguagesService, utils) {
'use strict';

	var pageControl = this;
	pageControl.page = PageService;
	pageControl.params = ParamService;
	pageControl.languages = LanguagesService;

	/* METHODS */

	pageControl.searchForThisTerm = function (title) {
		setSearchTerm(title);
		PagesService.search();
		pageControl.toggleLeadLarge();
	}; // searchForThisTerm

	pageControl.toggleFullWidthClass = function () {
		return ParamService.pageLarge ? 'full-width' : 'half-width';
	}; // selectText

	pageControl.toggleLeadLarge = function () {
		ParamService.pageLarge = !ParamService.pageLarge;
	}; // toggleLeadLarge


	/* HELPERS */

	function setSearchTerm(newTerm) {
		ParamService.setSearchTerm(newTerm);
		utils.updatePath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
