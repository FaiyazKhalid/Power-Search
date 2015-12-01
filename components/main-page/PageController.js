function PageController(PageService, ParamService, PagesService, LanguagesService, utils) {
'use strict';

	var self = this;
	self.page = PageService;
	self.params = ParamService;
	self.languages = LanguagesService;

	/* METHODS */

	self.searchForThisTerm = function (title) {
		setSearchTerm(title);
		PagesService.search();
		self.toggleLeadLarge();
	}; // searchForThisTerm

	self.toggleFullWidthClass = function () {
		return ParamService.pageLarge ? 'full-width' : 'half-width';
	}; // selectText

	self.toggleLeadLarge = function () {
		ParamService.pageLarge = !ParamService.pageLarge;
	}; // toggleLeadLarge


	/* HELPERS */

	function setSearchTerm(newTerm) {
		ParamService.setSearchTerm(newTerm);
		utils.updatePath(newTerm);
	}	// setSearchTerm


} // PageController

module.exports = PageController;
