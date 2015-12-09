'use strict';


function ProjectsService($http, ParamService) {

	var self = this;
	self.projects = [];

	self.availableProjects = [{
		name: 'wikipedia',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/53px-Wikipedia-logo-v2.svg.png'
    }, {
		name: 'wikiquote',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/40px-Wikiquote-logo.svg.png'
    }, {
		name: 'wiktionary',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Wiktionary-logo-en.svg/50px-Wiktionary-logo-en.svg.png'
    }, {
		name: 'wikisource',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikisource-logo.svg/46px-Wikisource-logo.svg.png'
    }, {
		name: 'wikivoyage',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wikivoyage-Logo-v3-icon.svg/48px-Wikivoyage-Logo-v3-icon.svg.png'
    }, {
		name: 'wikinews',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Wikinews-logo.svg/48px-Wikinews-logo.svg.png'
    }, {
		name: 'commons',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Commons-logo.svg/36px-Commons-logo.svg.png'
    }]; // projects


	/*** METHODS ***/

	self.getProjects = function() {
		return self.availableProjects;
	};


	self.get = function () {
		$http.jsonp(ParamService.languagesUrl)
			.success(function (data) {
				resetProjects();
				filterProjects(data);
			});
	};	// get


	/*** HELPERS ***/

	function filterProjects (data) {
		angular.forEach(data.sitematrix, function (thisLang) {
			if (!isChosenLang(thisLang)) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				if (isAvailable(thisLang.site[i])) {
					console.log(thisLang.site[i].code);
					self.projects.push(thisLang.site[i]);
				}
			} // end for
		}); // angular.forEach

		function isAvailable (thisSite) {
			if (thisSite.code === 'wiki') thisSite.code = 'wikipedia';
			for(var i = 0; i < self.availableProjects.length; i++) {
				if(thisSite.code === self.availableProjects[i].name) {
					return true;
				}
			}
			//angular.forEach(self.availableProjects, function (thisProject) {

			//});
		}	// isAvailable

	}	// filterProjects


	function resetProjects() {
		self.projects = [];
	}	// resetProjects

	function isChosenLang(thisLang) {
		return thisLang.code === ParamService.getLang();
	}	// isChosenLang


} // ProjectsService

module.exports = ProjectsService;
