(function () {
/*
	TODO:
	// u interfejs save settings checkbox
	// uključiti babel
	// napraviti gulp za pakovanje i minifikovanje js fajlova
	// primer paramUrl u dokumentaciju

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

		wiki.languages = StaticData.getLanguages();
		wiki.projects = StaticData.getProjects();

		// initial
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
			if (wiki.params.search.gsrlimit > 50) wiki.params.search.gsrlimit = 50;
		}; // checkMaxResults


		/*** SETTERS ***/

		wiki.setSearchTerm = function(newTerm) {
			if(newTerm) wiki.params.searchTerm = newTerm;
			$location.path(wiki.params.searchTerm);
			Params.updateSearchTerm();
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
