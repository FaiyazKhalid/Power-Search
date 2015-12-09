'use strict';

function LanguagesService($http, ParamService) {

	var self = this;
	self.all = [];

	var chosenLang = ParamService.getLang();
	var defaultLang = 'en';

	/*** METHODS ***/

	self.get = function () {
		self.resetErrors();
		if (ParamService.getDomain() === "commons") return;
		var paramUrl = "https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK";
		// console.log(paramUrl);

		$http.jsonp(paramUrl)
			.success(function (data) {
				self.all = [];
				filterLanguages(data);
			});
	}; // search


	self.resetErrors = function () {
		self.error = null;
	};


	/*** HELPERS ***/

	function filterLanguages(data) {
		var chosenLangFound = false;
		var domain = ParamService.getDomain();
		if (domain === "wikipedia") domain = "wiki";

		angular.forEach(data.sitematrix, function (thisLang) {
			if (!thisLang.site) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				if (langDomainExists(thisLang.site[i])) self.all.push(thisLang);
				if (langDomainExists(thisLang.site[i]) && isChosenLang(thisLang)) chosenLangFound = true;
			} // end for
		}); // angular.forEach

		if (!chosenLangFound) ParamService.setLanguage(defaultLang);

        function langDomainExists(thisSite) {
            return (domain === thisSite.code);
        }

        function isChosenLang(thisLang) {
            return thisLang.code === chosenLang;
        }
	} // filterLanguages


} // LanguagesService

module.exports = LanguagesService;
