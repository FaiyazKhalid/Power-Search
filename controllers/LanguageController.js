'use strict';

function LanguageController(Languages) {
	var lang = this;
	lang.languages = Languages;

	Languages.get();

} // LanguageController

module.exports = LanguageController;
