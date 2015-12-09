'use strict';

function LanguagesService($http, ParamService) {

	var self = this;
	self.all = [];
	self.projects = [];

	var defaultLang = 'en';
	var chosenDomain = ParamService.getDomain();


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
		updateChosenDomain();
		var chosenLangFound = false;

		angular.forEach(data.sitematrix, function (thisLang) {
			if (!thisLang.site) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				if (langDomainExists(thisLang.site[i])) self.all.push(thisLang);
				if (langDomainExists(thisLang.site[i]) && isChosenLang(thisLang)) chosenLangFound = true;
			} // end for
		}); // angular.forEach

		if (!chosenLangFound) ParamService.setLanguage(defaultLang);
	} // filterLanguages


	function updateChosenDomain () {
		chosenDomain = ParamService.getDomain();
		if (chosenDomain === "wikipedia") chosenDomain = "wiki";
	}	// updateChosenDomain

	function langDomainExists(thisSite) {
		return (chosenDomain === thisSite.code);
	}	// langDomainExists

	function isChosenLang(thisLang) {
		return thisLang.code === ParamService.getLang();
	}	// isChosenLang

} // LanguagesService


module.exports = LanguagesService;
