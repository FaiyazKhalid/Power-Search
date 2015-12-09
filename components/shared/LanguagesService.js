'use strict';

function LanguagesService($http, ParamService) {

	var self = this;
	self.all = [];
	self.projects = [];
	var defaultLang = 'en';
	var chosenLang = ParamService.getLang();
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


	self.getProjects = function () {
		$http.jsonp(ParamService.languagesUrl)
			.success(function (data) {
				self.resetProjects();
				filterDomains(data);
			});
	};	// getProjects


	self.resetErrors = function () {
		self.error = null;
	};

	self.resetLanguages = function () {
		self.all = [];
	};

	self.resetProjects = function () {
		self.projects = [];
	};


	/*** HELPERS ***/

	function filterLanguages(data) {
		updateChosenDomain();
		var chosenLangFound = false;

		angular.forEach(data.sitematrix, function (thisLang) {
			if (!thisLang.site) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				if (isLangDomainExists(thisLang.site[i])) self.all.push(thisLang);
				if (isLangDomainExists(thisLang.site[i]) && isChosenLang(thisLang)) chosenLangFound = true;
			} // end for
		}); // angular.forEach

		if (!chosenLangFound) ParamService.setLanguage(defaultLang);
	} // filterLanguages


	function filterDomains (data) {
		angular.forEach(data.sitematrix, function (thisLang) {
			if (!isChosenLang(thisLang)) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				self.projects.push(thisLang.site[i]);
			} // end for
		}); // angular.forEach

		console.log(self.projects);
	}	// filterDomains


	/*** LITTLE HELPERS ***/

	function updateChosenDomain () {
		chosenDomain = ParamService.getDomain();
		if (chosenDomain === "wikipedia") chosenDomain = "wiki";
	}	// updateChosenDomain

	function isLangDomainExists(thisSite) {
		return (chosenDomain === thisSite.code);
	}	// isLangDomainExists

	function isChosenLang(thisLang) {
		return thisLang.code === chosenLang;
	}	// isChosenLang

} // LanguagesService

module.exports = LanguagesService;
