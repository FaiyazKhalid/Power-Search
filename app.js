(function () {
/*
	TODO:
	// kad uporedjuje naslov, da otvori kako treba
	// prepraviti try again..
	// napraviti gulp za pakovanje i minifikovanje js fajlova
	// uključiti babel
	// primer paramUrl u dokumentaciju

	// pretrazuje datoteke na ostavi:
	// if (domain == 'commons') searchParams.namespace = 6

	BAGOVI:
	// potraga damjan prikazuje nerelevantan lead
	// filenameToCommonsUrl greska kada trazim vecu sirinu od originala
	// za svg slike ne pravi thumb, probati montenegro
*/
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);

	function WikiController($window, $scope, $animate, $location, utils, Wikidata, Params, WikiApi) {

		/*** PRIVATE PROPERTIES ***/
		var wiki = this;
		var leadImgWidth = 175;
		var triedTwice = false;		// try again to find article with different capitalisation

		/*** PUBLIC PROPERTIES ***/

		wiki.languages = Wikidata.getLanguages();
		wiki.projects = Wikidata.getProjects();

		// initial
		wiki.lang = Params.getLang();
		wiki.domain = Params.getDomain();
		wiki.searchTerm = Params.getSearchTerm();
		wiki.searchFilter = Params.getFilter();
		wiki.maxResults = Params.getMaxResults();

		wiki.page = null;
		wiki.results = null;
		wiki.error = null;
		wiki.leadLarge = false;


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			Params.loadSettings();
			readUrlTerm();
			wiki.searchWikipedia();
			$window.onhashchange = wiki.init;
		}; // init


		wiki.searchWikipedia = function () {
			clearAllResults();
			if(!wiki.searchTerm) return;
			updateSearchTerm();
			WikiApi.search(Params.getSearchParams(), function(results){
				wiki.results = results;
				wiki.openArticle(wiki.searchTerm);
			});
		}; // searchWikipedia


		wiki.openArticle = function (title) {
			resetLeadArticle();
			utils.scrollToTop(300);
			Params.setArticleTitle(title);
			WikiApi.open(Params.getArticleParams(), function(page) {
				// if (!page) tryAgainCapitalized(title);
				removeFromList(title, wiki.results);
				wiki.page = page;
			});
		}; // openArticle


		wiki.setFilter = function(){
			Params.setFilter(wiki.searchFilter);
		};

		wiki.setDomain = function (newDomain){
			wiki.domain = newDomain;
			Params.setDomain(newDomain);
		};	// setDomain


		wiki.setSearchTerm = function (newTerm){
			wiki.searchTerm = newTerm;
			Params.setSearchTerm(newTerm);
		};	// setSearchTerm


		wiki.searchForLeadTerm = function (title) {
			wiki.setSearchTerm(title);
			wiki.searchWikipedia();
			wiki.toggleLeadLarge();
		}; // searchForLeadTerm


		wiki.toggleLeadLarge = function () {
			wiki.leadLarge = !wiki.leadLarge;
		}; // toggleLeadLarge


		wiki.selectText = function () {
			var text = $window.getSelection().toString();
			wiki.searchTerm = text;
		}; // toggleLeadLarge


		wiki.checkMax = function () {
			if (wiki.maxResults > 50) wiki.maxResults = 50;
			Params.setMaxResults(wiki.maxResults);
		}; // checkMax



		/*** PRIVATE FUNCTIONS ***/

		function resetError() {
			wiki.error = "";
		}	// resetError


		function resetLeadArticle(){
			wiki.page = '';
			wiki.imageThumbUrl = '';
			wiki.imageUrl = '';
		}	// resetLeadArticle


		function clearAllResults() {
			resetError();
			wiki.results = [];
			resetLeadArticle();
		} // clearAllResults


		function tryAgainCapitalized(title) {
			if (triedTwice) return;
			if (title.split(" ").length < 2) return;
			wiki.openArticle(utils.capitalize(title));
			triedTwice = true;
		}	// tryAgainCapitalized


		function readUrlTerm() {
			wiki.searchTerm = $location.path().substr(1) || wiki.searchTerm;
		}

		function updateSearchTerm() {
			$location.path(wiki.searchTerm);
			Params.setSearchTerm(wiki.searchTerm);
		}

		function removeFromList(term, results) {
			for (var x in results) {
				if (results[x].title == utils.capitalizeFirst(term)) {
					results.splice(x, 1); // remove it from the list
					return results;
				}
			} // end for
		} // removeFromList


	} // WikiController

})();
