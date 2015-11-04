(function () {
/*
	TODO:
	// napraviti da prvo proverava poklapanje sa kapitalizacijom (first upper and all upper), a posle sa malim slovima; primer buga: dada content
	// kad izaberem clanak sa liste da se iz rezultata premesti u glavni, i obratno (da moze da se vraca u results)
	// objekti nisu isti, ali mogu da se extenduju
	// uključiti babel
	// napraviti gulp za pakovanje i minifikovanje js fajlova
	// primer paramUrl u dokumentaciju

	// pretrazuje datoteke na ostavi:
	// if (domain == 'commons') searchParams.namespace = 6

	BAGOVI:
	// greska kada trazim vecu sirinu slike od originala
*/
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize', 'underscore'])
		.controller('WikiController', WikiController);

	function WikiController($window, $scope, $animate, $location, utils, StaticData, Params, WikiApi, _) {

		/*** PRIVATE PROPERTIES ***/
		var wiki = this;
		var leadImgWidth = 175;
		var triedTwice = false;		// try again to find article with different capitalisation

		/*** PUBLIC PROPERTIES ***/

		wiki.languages = StaticData.getLanguages();
		wiki.projects = StaticData.getProjects();

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
			wiki.search();
			$window.onhashchange = wiki.init;
		}; // init


		wiki.search = function () {
			clearAllResults();
			if(!wiki.searchTerm) return;
			updateSearchTerm();
			WikiApi.search(Params.getSearchParams(), function(){
				if(WikiApi.getExactMatch()) wiki.open(WikiApi.getExactMatch());
				wiki.results = WikiApi.getSearchResults();
			});
		}; // search


		wiki.open = function (title) {
			resetLeadArticle();
			utils.scrollToTop(300);
			Params.setArticleTitle(title);
			WikiApi.open(Params.getArticleParams(), function() {
				wiki.page = WikiApi.getOpenedPage();
			});
		}; // open


		wiki.searchForLeadTerm = function (title) {
			wiki.setSearchTerm(title);
			wiki.search();
			wiki.toggleLeadLarge();
		}; // searchForLeadTerm


		wiki.toggleLeadLarge = function () {
			wiki.leadLarge = !wiki.leadLarge;
		}; // toggleLeadLarge


		wiki.selectText = function () {
			var text = $window.getSelection().toString();
			wiki.searchTerm = text;
		}; // toggleLeadLarge


		wiki.checkMaxResults = function () {
			if (wiki.maxResults > 50) wiki.maxResults = 50;
			Params.setMaxResults(wiki.maxResults);
		}; // checkMaxResults


		/*** PARAMS ***/

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

		// moguc duplikat!
		function updateSearchTerm() {
			$location.path(wiki.searchTerm);
			Params.setSearchTerm(wiki.searchTerm);
		}


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

		function readUrlTerm() {
			wiki.searchTerm = $location.path().substr(1) || wiki.searchTerm;
		}


	} // WikiController

})();
