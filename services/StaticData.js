(function () {
	'use strict';
	angular
		.module("wikiModul")
		.factory('StaticData', StaticData);

	function StaticData() {

		// TODO: dinamicaly populate list with available languages
		// https://phabricator.wikimedia.org/diffusion/MW/browse/master/languages/Names.php

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
            logo: 'img/wikipedia-logo.png'
        }, {
            name: 'wiktionary',
            logo: 'img/wiktionary-logo.png'
        }, {
            name: 'wikiquote',
            logo: 'img/wikiquote-logo.png'
        }, {
            name: 'wikisource',
            logo: 'img/wikisource-logo.png'
        }, {
            name: 'wikispecies',
            logo: 'img/wikispecies-logo.png'
        }, {
            name: 'wikivoyage',
            logo: 'img/wikivoyage-logo.png'
        }, {
            name: 'wikinews',
            logo: 'img/wikinews-logo.png'
        }, {
            name: 'commons',
            logo: 'img/commons-logo.png'
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

	}  // StaticData

})();
