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

	function WikiController($http, $window, $scope, $animate, $location, utils, WikidataService, Params) {

		/*** PRIVATE PROPERTIES ***/
		var wiki = this;
		var leadImgWidth = 175;
		var triedTwice = false;		// try again to find article with different capitalisation

		/*** PUBLIC PROPERTIES ***/

		wiki.languages = WikidataService.getLanguages();
		wiki.projects = WikidataService.getProjects();
		wiki.lang = Params.getLang();
		wiki.domain = Params.getDomain();
		wiki.apiUrl = Params.getApiUrl();
		wiki.searchTerm = Params.getSearchTerm();
		wiki.searchFilter = Params.getFilter();
		wiki.maxResults = Params.getMaxResults();
		wiki.page = null;
		wiki.results = null;
		wiki.error = null;
		wiki.leadLarge = false;
		wiki.imageUrl = '';
		wiki.imageThumbUrl = '';

		var defaulParams = Params.getDefaultParams();
		var articleParams = Params.getArticleParams();
		var searchParams = Params.getSearchParams();


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			Params.loadParams();
			checkUrlTerm();
			wiki.searchWikipedia();
			$window.onhashchange = wiki.init;
		}; // init

		function checkUrlTerm() {
			wiki.searchTerm = $location.path().substr(1) || wiki.searchTerm; // removes / before path
		}


		wiki.searchWikipedia = function () { // mozda ne treba ulazni argument
			wiki.emptyResults();
			if(!wiki.searchTerm) return;
			updateApiDomain();
			Params.setSearchTerm(wiki.searchTerm);
			$location.path(wiki.searchTerm);
			var params = angular.extend(searchParams, defaulParams);
			var paramUrl = createParamUrl(params, wiki.apiUrl);
			console.log(paramUrl);

			$http.jsonp(paramUrl)
				.success(showResults)
				.error(handleErrors);

			Params.saveParams();
		}; // searchWikipedia


		wiki.openArticle = function (title) {
			resetArticle();
			utils.scrollToTop(300);
			Params.setArticleTitle(title);
			var params = angular.extend(searchParams, defaulParams);
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


		wiki.setFilter = function(){
			Params.setFilter(wiki.searchFilter);
		};


		wiki.searchInDomain = function (domainName) {
			setDomainName(domainName);
			wiki.searchWikipedia();
		}; // searchInDomain


		wiki.searchForLeadTerm = function (title) {
			if (wiki.leadLarge) {
				Params.setSearchTerm(title);
				wiki.searchWikipedia(title, searchParams);
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


		wiki.emptyResults = function () {
			wiki.results = [];
			wiki.page = "";
		}; // emptyResults


		wiki.checkMax = function () {
			if (wiki.maxResults > 50) Params.setMaxResults(50);
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
			if (data.query.pages[0].missing) tryAgainCapitalized(articleParams.titles);
			if (data.query.pages[0].missing) return;
			wiki.page = data.query.pages[0];
			removeArticleFromResults(articleParams.titles, wiki.results);
			removeRedirections(data.query.redirects, wiki.results);
			resetImage();
			if (wiki.page.pageimage) findWikiImage(wiki.page.pageimage);
		}	// showArticle


		function setDomainName(domainName) {
			wiki.domain = domainName;
		} // setDomainName


		function updateApiDomain() {
			wiki.apiUrl = 'http://' + wiki.lang + '.' + wiki.domain + '.org/w/api.php';
			if (wiki.domain == 'commons') wiki.apiUrl = 'http://commons.wikimedia.org/w/api.php';
		} // updateApiDomain


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
