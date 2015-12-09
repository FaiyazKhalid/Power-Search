'use strict';


function ProjectsService() {

	var wikiProjects = [{
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


	function getProjects() {
		return wikiProjects;
	}


	return {
		getProjects: getProjects
	};

} // ProjectsService

module.exports = ProjectsService;
