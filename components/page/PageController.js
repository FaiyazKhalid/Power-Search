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

	pageControl.toggleFullWidth = function () {
		return ParamService.pageLarge ? 'col-md-12' : 'col-md-6 col-md-push-6';
	}; // selectText

	pageControl.toggleLeadLarge = function () {
		ParamService.pageLarge = !ParamService.pageLarge;
	}; // toggleLeadLarge


	/* HELPERS */

	function setSearchTerm(newTerm) {
		ParamService.setSearchTerm(newTerm);
		utils.setPath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
