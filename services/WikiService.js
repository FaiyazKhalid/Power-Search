(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('WikiService', WikiService);

	function WikiService() {

		// TODO: dinamicaly populate list with available languages
        var wikiLanguages = [{
			id: 'en',
			name: 'English'
        }, {
			id: 'sr',
			name: 'Српски'
        }, {
			id: 'sh',
			name: 'Srpskohrvatski'
        }]; // languages


        var wikiProjects = [{
            name: 'wikipedia',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/53px-Wikipedia-logo-v2.svg.png'
        }, {
            name: 'wiktionary',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Wiktionary_small.svg/48px-Wiktionary_small.svg.png'
        }, {
            name: 'wikiquote',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/40px-Wikiquote-logo.svg.png'
        }, {
            name: 'wikisource',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikisource-logo.svg/46px-Wikisource-logo.svg.png'
        }, {
            name: 'wikispecies',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wikispecies-logo.svg/48px-Wikispecies-logo.svg.png'
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

        function getLanguages() {
            return wikiLanguages;
        }


		return {
            getProjects: getProjects,
            getLanguages: getLanguages
		};

	}  // WikiService

})();
