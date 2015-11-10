'use strict';

function LanguageController(LanguageService) {
	var lang = this;
	lang.languages = LanguageService;

	LanguageService.get();

} // LanguageController

module.exports = LanguageController;
