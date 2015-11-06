(function () {
/*
	BAGOVI:
	// ne prikazuje preusmerenja u lead, primer buddha; naci preusmerenja; ako nema exactMatch da pokusa naslepo da otvori?

	TODO:
	// vezati parametre direktno za ng model, pretvoriti Params u service
	// kad izaberem clanak sa liste da se iz rezultata premesti u glavni, i obratno (da moze da se vraca u results); page objekti nisu isti, ali mozda mogu da se extenduju
	// uključiti babel
	// napraviti gulp za pakovanje i minifikovanje js fajlova
	// primer paramUrl u dokumentaciju
	// u interfejs save settings checkbox i alphabetical/unorder radio

	// pretrazuje datoteke na ostavi:
	// if (domain == 'commons') searchParams.namespace = 6
*/
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);

	function WikiController(Api, $window, $location, utils, StaticData, Params) {

		/*** PRIVATE PROPERTIES ***/
		var wiki = this;
		var leadImgWidth = 175;

		/*** PUBLIC PROPERTIES ***/
		wiki.api = Api;
		wiki.params = Params;
		console.log(wiki.params.searchTerm);

		wiki.languages = StaticData.getLanguages();
		wiki.projects = StaticData.getProjects();

		// initial
		wiki.lang = Params.getLang();
		wiki.domain = Params.getDomain();
		wiki.params.searchTerm = Params.getSearchTerm();
		wiki.searchFilter = Params.getFilter();
		wiki.maxResults = Params.getMaxResults();
		wiki.leadLarge = false;


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			Params.loadSettings();
			readUrlTerm();
			wiki.search();
			$window.onhashchange = wiki.init;
		}; // init


		wiki.search = function () {
			//clearAllResults();
			if(!wiki.params.searchTerm) return;
			wiki.setSearchTerm();
			Api.search(Params.getSearchParams());
		}; // search


		wiki.open = function (title) {
			resetLeadArticle();
			utils.scrollToTop(300);
			Params.setArticleTitle(title);
			Api.open(Params.getArticleParams());
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
			wiki.params.searchTerm = text;
		}; // toggleLeadLarge


		wiki.checkMaxResults = function () {
			if (wiki.maxResults > 50) wiki.maxResults = 50;
			Params.setMaxResults(wiki.maxResults);
		}; // checkMaxResults


		/*** SETTERS ***/

		wiki.setFilter = function(){
			Params.setFilter(wiki.searchFilter);
		};

		wiki.setDomain = function (newDomain){
			wiki.domain = newDomain;
			Params.setDomain(newDomain);
		};	// setDomain

		wiki.setSearchTerm = function(newTerm) {
			if(newTerm) wiki.params.searchTerm = newTerm;
			$location.path(wiki.params.searchTerm);
			Params.setSearchTerm(wiki.params.searchTerm);
			Params.setArticleTitle(wiki.params.searchTerm);
		};	// setSearchTerm


		/*** PRIVATE FUNCTIONS ***/

		function resetError() {
			wiki.api.error = "";
		}	// resetError

		function resetLeadArticle(){
			wiki.api.page = '';
			wiki.api.imageThumbUrl = '';
			wiki.api.imageUrl = '';
		}	// resetLeadArticle

		function clearAllResults() {
			resetError();
			wiki.api.results = null;
			resetLeadArticle();
		} // clearAllResults

		function readUrlTerm() {
			wiki.params.searchTerm = $location.path().substr(1) || wiki.params.searchTerm;
		}


	} // WikiController

})();
