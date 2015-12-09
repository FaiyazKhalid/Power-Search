'use strict';

function LanguagesService($http, ParamService) {

	var self = this;
	self.all = [];
	var defaultLang = 'en';
	var chosenLang = ParamService.getLang();


	/*** METHODS ***/

	self.get = function () {
		self.resetErrors();
		if (ParamService.getDomain() === "commons") return;

		$http.jsonp(ParamService.languagesUrl)
			.success(function (data) {
				self.resetLanguages();
				filterLanguages(data);
			})
			.error(function (err) {
				console.log("Lang error: ", err);
			});
	}; // search


	self.resetErrors = function () {
		self.error = null;
	};

	self.resetLanguages = function () {
		self.all = [];
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
