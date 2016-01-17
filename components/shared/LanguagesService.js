'use strict';

function LanguagesService($http, ParamService) {

	var service = this;
	service.all = [];

	var defaultLang = 'en';
	var chosenDomain = ParamService.getDomain();


	/*** METHODS ***/

	service.get = function () {
		service.resetErrors();
		if (ParamService.getDomain() === "commons") return;

		$http.jsonp(ParamService.languagesUrl)
			.success(function (data) {
				service.resetLanguages();
				filterLanguages(data);
			})
			.error(function (err) {
				console.log("Lang error: ", err);
			});
	}; // search


	service.resetErrors = function () {
		service.error = null;
	};

	service.resetLanguages = function () {
		service.all = [];
	};


	/*** HELPERS ***/

	function filterLanguages(data) {
		updateChosenDomain();
		var chosenLangFound = false;

		angular.forEach(data.sitematrix, function (thisLang) {
			if (!thisLang.site) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				if (langDomainExists(thisLang.site[i])) service.all.push(thisLang);
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
