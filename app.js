(function () {
/*
	TODO:
	// findWikiImage da bude univerzalna za svaki wiki projekt
	// napraviti gulp za pakovanje i minifikovanje js fajlova

	RESENJA:
	// pretrazuje datoteke na ostavi:
	// if (domain == 'commons') searchParams.namespace = 6

	BAGOVI:
	// potraga damjan prikazuje nerelevantan lead
	// filenameToCommonsUrl greska kada trazim vecu sirinu od originala

	REFAKTOR:
	https://scotch.io/tutorials/making-skinny-angularjs-controllers
	// kontroler da bude agnostičan po pitanju podataka, model ide u servis
	// parametre i http gurnuti u servis
	// mozda razdvojiti html na delove sa zajednickim kontrolerom
	// mozda razdvojiti u više kontrolera

	// primer paramUrl u dokumentaciju
*/
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);

	function WikiController($http, $window, $scope, $animate, $location, utils, WikidataService, ParamService) {

		/*** PRIVATE PROPERTIES ***/
		var wiki = this;
		var leadImgWidth = 175;
		var triedTwice = false;		// try again to find article with different capitalisation

		/*** PUBLIC PROPERTIES ***/
		wiki.lang = 'en';
		wiki.domain = 'wikipedia';
		wiki.apiUrl = 'http://en.wikipedia.org/w/api.php';
		wiki.searchTerm = 'zen'; // default
		wiki.searchFilter = "intitle:";
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";
		wiki.leadLarge = false;
		wiki.languages = WikidataService.getLanguages();
		wiki.projects = WikidataService.getProjects();
		wiki.imageUrl = '';
		wiki.imageThumbUrl = '';

		var defaulParams = {
			action: 'query',
			prop: 'extracts|pageimages|info',	// |images| return all images from page
			inprop: 'url',	// return full url
			redirects: '', // automatically resolve redirects
			continue: '',	// continue the query?
			format: 'json',
			formatversion: 2,
			callback: 'JSON_CALLBACK'
		};

		wiki.articleParams = {
			titles: wiki.searchTerm
		};

		wiki.searchParams = {
			generator: 'search',
			gsrsearch: wiki.searchTerm + wiki.searchFilter,
			gsrnamespace: 0,	// 0 article, 6 file
			gsrlimit: 20, // broj rezultata, max 50
			pilimit: 'max', // thumb image for all articles
			exlimit: 'max', // extract limit
			// imlimit: 'max', // images limit
			exintro: '' // extracts intro
		};





		// https://www.mediawiki.org/wiki/API:Lists/All#Allimages
		wiki.imageParams = {
			action: 'query',
			list: 'allimages',
			format: 'json',
			//ailimit: 10,	// max 500
			//aicontinue: ''
			aifrom: 'Dada'
		};


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			loadLocalParams();
			wiki.searchTerm = $location.path().substr(1) || wiki.searchTerm; // removes '/'
			wiki.searchWikipedia();
			$window.onhashchange = wiki.init;
		}; // init


		wiki.searchImages = function() {
			var paramUrl = createParamUrl(wiki.imageParams3, wiki.apiUrl);
			console.log(paramUrl);
			$http.jsonp(paramUrl)
				.success(function(data) {
					console.log(data);
				})
				.error(handleErrors);
		};


		wiki.searchWikipedia = function () { // mozda ne treba ulazni argument
			wiki.resetResults();
			if(!wiki.searchTerm) return;
			updateApiDomain();
			updateSearchTerm();
			$location.path(wiki.searchTerm);
			var params = angular.extend(wiki.searchParams, defaulParams);
			var paramUrl = createParamUrl(params, wiki.apiUrl);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(showResults)
				.error(handleErrors);

			saveSearchParams();
		}; // searchWikipedia


		wiki.openArticle = function (title) {
			resetArticle();
			utils.scrollToTop(300);
			wiki.articleParams.titles = title;
			var params = angular.extend(wiki.searchParams, defaulParams);
			var paramUrl = createParamUrl(params, wiki.apiUrl);
			//console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(showArticle)
				.error(handleErrors);
		}; // openArticle


		wiki.resetLeadImage = function () {
			wiki.imageThumbUrl = '';
		};

		wiki.createArticleUrl = function(title) {
			var domainUrl = 'https://' + wiki.lang + '.' + wiki.domain + '.org';
			if (wiki.domain == 'commons') domainUrl = 'https://commons.wikimedia.org';
			return domainUrl + '/wiki/' + title;
		};	// createArticleUrl


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



		/*** PRIVATE FUNCTIONS ***/

		function showResults(data) {
			resetError();
			if (!data.query) return;
			wiki.results = data.query.pages;
			triedTwice = false;
			wiki.openArticle(wiki.searchTerm);
		}	// showResults


		function showArticle(data) {
			if (!data.query) return;
			if (data.query.pages[0].missing) tryAgainCapitalized(wiki.articleParams.titles);
			if (data.query.pages[0].missing) return;
			wiki.page = data.query.pages[0];
			removeArticleFromResults(wiki.articleParams.titles, wiki.results);
			removeRedirections(data.query.redirects, wiki.results);
			resetImage();
			if (wiki.page.pageimage) findWikiImage(wiki.page.pageimage);
		}	// showArticle


		function saveSearchParams() {
			localStorage.wikiSearchTerm = wiki.searchTerm || '';
			localStorage.wikiLang = wiki.lang || '';
			localStorage.wikiMaxResult = wiki.searchParams.gsrlimit || '';
			localStorage.wikiDomain = wiki.domain || '';
			localStorage.wikiFilter = wiki.searchFilter || '';
		} // saveSearchParams


		function loadLocalParams() {
			wiki.searchTerm = localStorage.wikiSearchTerm || wiki.searchTerm;
			wiki.lang = localStorage.wikiLang || wiki.lang;
			wiki.searchParams.gsrlimit = Number(localStorage.wikiMaxResult || wiki.searchParams.gsrlimit);
			wiki.domain = localStorage.wikiDomain || wiki.domain;
			wiki.searchFilter = localStorage.wikiFilter || wiki.searchFilter;
			if(localStorage.wikiFilter === '') wiki.searchFilter = '';
		} // saveSearchParams


		function setDomainName(domainName) {
			wiki.domain = domainName;
		} // setDomainName


		function updateApiDomain() {
			wiki.apiUrl = 'http://' + wiki.lang + '.' + wiki.domain + '.org/w/api.php';
			if (wiki.domain == 'commons') wiki.apiUrl = 'http://commons.wikimedia.org/w/api.php';
		} // updateApiDomain


		function updateSearchTerm() {
			wiki.searchParams.gsrsearch = wiki.searchFilter + wiki.searchTerm;
		} // updateSearchTerm


		function removeArticleFromResults(term, results) {
			for (var x in results) {
				if (results[x].title == utils.capitalizeFirst(term)) {
					results.splice(x, 1); // remove it from the list
					return results;
				}
			} // end for
		} // removeArticleFromResults


		function removeRedirections(redirects, results) {
			for (var x in results) {
				for (var r in redirects) {
					if (redirects[r].to == results[x].title) {
						results.splice(x, 1);
					}
				}
			} // end for
			return results;
		} // removeRedirections


		function handleErrors(data, status, headers, config) {
			wiki.error = "Oh no, there was some error in geting data: " + status;
		} // handleErrors


		function resetError() {
			wiki.error = "";
		}	// resetError


		function resetArticle(){
			wiki.page = '';
		}	// resetArticle


		function resetImage() {
			wiki.imageThumbUrl = '';
			wiki.imageUrl = '';
		}	// resetImage


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


		function findWikiImage(filename) {
			// if image is not on commons, then it is on wikipedia
			var file = new Image();
			file.onerror = function () {
				$scope.$apply(function () {
					wiki.imageThumbUrl = filenameToWikipediaUrl(filename);
				});
			};
			file.onload = function () {
				$scope.$apply(function () {
					wiki.imageThumbUrl = file.src;
					wiki.imageUrl = filenameToCommonsUrl(filename);
				});
			};
			file.src = filenameToCommonsUrl(filename, leadImgWidth);
		} // findWikiImage


		function tryAgainCapitalized(title) {
			if (triedTwice) return;
			if (title.split(" ").length < 2) return;
			wiki.openArticle(utils.capitalize(title));
			triedTwice = true;
		}	// tryAgainCapitalized


		function createParamUrl(params, apiUrl) {
			var paramUrl = apiUrl + '?' + utils.serialize(params);
			return paramUrl;
		} // createParamUrl


	} // WikiController

})();
