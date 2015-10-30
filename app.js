(function () {

	// i dalje se desava da fiter bude undefined, postaviti strog uslov da ima samo tri opcije
	// commons treba da pretrazuje i otvara fajlove, ne clanke
	// checkIfOnCommons da bude univerzalna za svaki wiki projekt
	// primer paramUrl u dokumentaciju

	/*
	    za naziv slike vraca url:
	    https://en.wikipedia.org/w/api.php?action=query&titles=File:Albert%20Einstein%20Head.jpg&prop=imageinfo&iiprop=url
	    mozemo dodati i zeljenu sirinu: &iiurlwidth=220

	    vraca nadjene slike za trazeni termin:
	    https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&format=json&ailimit=10&aifrom=Albert

		vraca url za zeljenu velicinu slike:
		https://commons.wikimedia.org/w/api.php?action=query&titles=File:Spelterini_Bl%C3%BCemlisalp.jpg&prop=imageinfo&iiprop=url&iiurlwidth=200
		ili izravno vraca zeljenu velicinu slike (dodati thumb, a na kraju velicinu i ponovo naziv):
		https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/ZenX-fi2.JPG/600px-ZenX-fi2.JPG

	    alternativni commonsapi:
	    https://tools.wmflabs.org/magnus-toolserver/commonsapi.php
	    vraca info o slici i url:
	    https://tools.wmflabs.org/magnus-toolserver/commonsapi.php?image=Albert_Einstein_Head.jpg

	    lista jezika:
	    https://phabricator.wikimedia.org/diffusion/MW/browse/master/languages/Names.php
	    https://meta.wikimedia.org/wiki/List_of_Wikipedias
	    https://en.wikipedia.org/wiki/List_of_Wikipedias
	*/

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);

	function WikiController($http, $window, $scope, $animate, $location, utils, DataService) {
		var wiki = this;

		/*** PUBLIC PROPERTIES ***/

		wiki.apiUrl = updateWikiDomen();
		wiki.lang = 'en';
		wiki.domain = 'wikipedia';
		wiki.apiUrl = 'http://' + wiki.lang + '.' + wiki.domain + '.org/w/api.php';
		wiki.searchTerm = 'zen'; // default
		wiki.searchFilter = "intitle:";
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";
		wiki.leadLarge = false;
		wiki.languages = DataService.getLanguages();
		wiki.projects = DataService.getProjects();

		wiki.searchParams = {
			generator: 'search',
			gsrsearch: wiki.searchTerm + wiki.searchFilter,
			gsrlimit: 20, // broj rezultata, max 50
			pilimit: 'max', // thumb image for all articles
			exlimit: 'max', // extract for all articles
			imlimit: 'max', // images in articles
			exintro: '' // extracts intro
		};

		wiki.articleParams = {
			titles: wiki.searchTerm
		};

		/*** PRIVATE PROPERTIES ***/

		var commonParams = {
			action: 'query',
			prop: 'extracts|pageimages|images',
			redirects: '', // automatically resolve redirects
			format: 'json',
			formatversion: 2,
			callback: 'JSON_CALLBACK'
		};
		var leadImgWidth = 200;


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			loadLocalParams();
			wiki.searchTerm = $location.path().substr(1) || wiki.searchTerm; // removes '/'
			wiki.searchWikipedia();
			$window.onhashchange = wiki.init;
		}; // init


		wiki.searchWikipedia = function () { // mozda ne treba ulazni argument
			updateWikiDomen();
			updateSearchTerm();
			$location.path(wiki.searchTerm);
			var paramUrl = utils.createParamUrl(wiki.searchParams, commonParams, wiki.apiUrl);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(function (data) {
					resetError();
					if (!data.query) {
						wiki.resetResults();
						return false;
					}
					wiki.results = data.query.pages;
					wiki.openArticle(wiki.searchTerm);
				})
				.error(handleErrors);

			saveSearchParams();
		}; // searchWikipedia


		wiki.openArticle = function (title) {
			utils.scrollToTop(300);
			wiki.articleParams.titles = title;
			var paramUrl = utils.createParamUrl(wiki.articleParams, commonParams, wiki.apiUrl);
			var secondAttemp = false;

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (data.query.pages[0].missing) {
						wiki.page = '';
						if (secondAttemp) return;
						wiki.openArticle(utils.capitalize(title));
						secondAttemp = true;
						return;
					}
					wiki.page = data.query.pages[0];
					removeLeadFromList(title, wiki.results);
					removeRedirects(data.query.redirects, wiki.results);
					if (wiki.page.pageimage) checkIfOnCommons(wiki.page.pageimage);
				})
				.error(handleErrors);
		}; // openArticle


		wiki.resetLeadImage = function () {
			wiki.page.imageThumbUrl = '';
		};

		wiki.searchInDomain = function (domainName) {
			setDomainName(domainName);
			wiki.searchWikipedia();
		}; // searchInDomain


		wiki.searchForLeadTerm = function (title) {
			if (wiki.leadLarge) {
				wiki.searchTerm = title;
				wiki.searchWikipedia(title, wiki.searchParams);
			}
			wiki.toggleLeadLarge();
		}; // searchForLeadTerm


		wiki.openLarge = function (title) {
			wiki.page = '';
			wiki.openArticle(title);
			wiki.leadLarge = true;
		}; // openLarge


		wiki.toggleLeadLarge = function () {
			wiki.leadLarge = !wiki.leadLarge;
		}; // toggleLeadLarge


		wiki.selectText = function () {
			var text = $window.getSelection().toString();
			wiki.searchTerm = text;
		}; // toggleLeadLarge


		wiki.leadHoverText = function () {
			return wiki.leadLarge ? "Search for this term" : "Englarge this article";
		}; // leadHoverText


		wiki.resetResults = function () {
			wiki.results = [];
			wiki.page = "";
		}; // resetResults


		wiki.checkMax = function () {
			if (wiki.searchParams.gsrlimit > 50) wiki.searchParams.gsrlimit = 50;
		}; // checkMax


		/*** PRIVATE HELPER FUNCTIONS ***/

		function saveSearchParams() {
			localStorage.wikiSearchTerm = wiki.searchTerm || '';
			localStorage.wikiLang = wiki.lang || '';
			localStorage.wikiMaxResult = wiki.searchParams.gsrlimit || '';
			localStorage.wikiDomain = wiki.domain || '';
			// filter could be empty string
			if (wiki.searchFilter !== undefined) {
				localStorage.wikiFilter = wiki.searchFilter;
			}
		} // saveSearchParams


		function loadLocalParams() {
			wiki.searchTerm = localStorage.wikiSearchTerm || wiki.searchTerm;
			wiki.lang = localStorage.wikiLang || wiki.lang;
			wiki.searchParams.gsrlimit = Number(localStorage.wikiMaxResult || wiki.searchParams.gsrlimit);
			wiki.domain = localStorage.wikiDomain || wiki.domain;
			if (localStorage.wikiFilter != 'undefined') {
				wiki.searchFilter = localStorage.wikiFilter;
			}
		} // saveSearchParams


		function setDomainName(domainName) {
			wiki.domain = domainName;
		} // setDomainName


		function updateWikiDomen() {
			wiki.apiUrl = 'http://' + wiki.lang + '.' + wiki.domain + '.org/w/api.php';
			if (wiki.domain == 'commons') wiki.apiUrl = 'http://commons.wikimedia.org/w/api.php';
		} // updateWikiDomen


		function updateSearchTerm() {
			wiki.searchParams.gsrsearch = wiki.searchFilter + wiki.searchTerm;
		} // updateSearchTerm

		function removeLeadFromList(term, results) {
			for (var x in results) {
				if (results[x].title == utils.capitalizeFirst(term)) {
					results.splice(x, 1); // remove it from the list
					return results;
				}
			} // end for
		} // removeLeadFromList


		function removeRedirects(redirects, results) {
			for (var x in results) {
				for (var r in redirects) {
					if (redirects[r].to == results[x].title) {
						results.splice(x, 1);
					}
				}
			} // end for
			return results;
		} // removeRedirects


		function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors


		function resetError() {
			wiki.error = "";
		}	// resetError


		function filenameToCommonsUrl(name, leadImgWidth) { // param: filename - string, leadImgWidth - number
			var parsed = wikiParseFilename(name, leadImgWidth);
			return 'http://upload.wikimedia.org/wikipedia/commons/' + parsed;
		} // filenameToCommonsUrl


		function filenameToWikipediaUrl(name) { // param: filename as a string
			var parsed = wikiParseFilename(name);
			return 'http://upload.wikimedia.org/wikipedia/' + wiki.lang + '/' + parsed;
		} // filenameToWikipediaUrl


		function wikiParseFilename(name, size) {
			var filename = utils.replaceSpacesWithUnderscores(name);
			var digest = md5(filename);
			var parsed = digest[0] + '/' + digest[0] + digest[1] + '/' + encodeURIComponent(filename);
			if (size) {
				return 'thumb/' + parsed + '/' + size + 'px-' + encodeURIComponent(filename);
			}
			return parsed;
		} // wikiParseFilename


		function checkIfOnCommons(filename) {
			// if image is not on commons, then it is on wikipedia
			var file = new Image();
			file.onerror = function () {
				$scope.$apply(function () {
					wiki.page.imageThumbUrl = filenameToWikipediaUrl(filename);
				});
			};
			file.onload = function () {
				$scope.$apply(function () {
					wiki.page.imageThumbUrl = file.src;
					wiki.page.imageUrl = filenameToCommonsUrl(filename);
				});
			};
			file.src = filenameToCommonsUrl(filename, leadImgWidth);
		} // checkIfOnCommons


	} // WikiController

})();
