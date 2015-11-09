(function () {
	'use strict';
	angular
		.module("wikiModul")
		.controller('LanguageController', LanguageController);

	function LanguageController(LanguageService) {

		var lang = this;
		lang.languages = LanguageService;
		lang.selected = 'en';

		LanguageService.get();

	} // LanguageController

})();
