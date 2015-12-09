'use strict';

function LanguagesService($http, ParamService) {

	var self = this;
	self.all = [];
	self.projects = [];
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


	function isChosenLang(thisLang) {
		return thisLang.code === chosenLang;
	}	// isChosenLang

} // LanguagesService

module.exports = LanguagesService;
