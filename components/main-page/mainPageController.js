function mainPageController(PageService, ParamService, PagesService, LanguagesService, utils) {
'use strict';

	var ctrl = this;
	ctrl.page = PageService;
	ctrl.params = ParamService;
	ctrl.languages = LanguagesService;

	/* METHODS */

	ctrl.searchForThisTerm = function (title) {
		setSearchTerm(title);
		PagesService.search();
		ctrl.toggleLeadLarge();
	}; // searchForThisTerm

	ctrl.toggleFullWidthClass = function () {
		return ParamService.pageLarge ? 'full-width' : 'half-width';
	}; // selectText

	ctrl.toggleLeadLarge = function () {
		ParamService.pageLarge = !ParamService.pageLarge;
	}; // toggleLeadLarge


	/* HELPERS */

	function setSearchTerm(newTerm) {
		ParamService.setSearchTerm(newTerm);
		utils.updatePath(newTerm);
	}	// setSearchTerm


} // mainPageController

module.exports = mainPageController;
