'use strict';


function ProjectsService($http, ParamService) {

	var service = this;
	service.projects = [];

	/*** DATA ***/

	var availableProjects = [{
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
    }]; // availableProjects

	/*** METHODS ***/

	service.get = function () {
		// console.log(ParamService.languagesUrl);
		$http.jsonp(ParamService.languagesUrl)
			.success(function (data) {
				resetProjects();
				filterProjects(data);
			});
	}; // get

	/*** HELPERS ***/

	function filterProjects(data) {
		angular.forEach(data.sitematrix, function (thisLang) {
			if (!isChosenLang(thisLang)) return;
			for (var i = 0; i < thisLang.site.length; i++) {
				harmonizeNamings(thisLang.site[i]);
				pushAvailableProjects(thisLang.site[i]);
			} // end for
		}); // angular.forEach
		service.projects.push(availableProjects[availableProjects.length-1]);	// always show commons
	} // filterProjects

	function pushAvailableProjects(thisSite) {
		for (var i = 0; i < availableProjects.length; i++) {
			if (thisSite.code === availableProjects[i].name) service.projects.push(availableProjects[i]);
		}
	} // pushAvailableProjects

	function harmonizeNamings(thisSite) {
		if (thisSite.code === 'wiki') thisSite.code = 'wikipedia';
	}

	function resetProjects() {
		service.projects = [];
	} // resetProjects

	function isChosenLang(thisLang) {
		return thisLang.code === ParamService.getLang();
	} // isChosenLang


} // ProjectsService

module.exports = ProjectsService;
