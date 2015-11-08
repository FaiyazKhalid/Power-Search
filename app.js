(function () {
/*
	TODO:
	// uključiti babel
	// napraviti gulp za pakovanje i minifikovanje js fajlova
	// primer paramUrl u dokumentaciju

	// pretrazuje datoteke na ostavi:
	// if (domain == 'commons') searchParams.namespace = 6

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema sh jezik
*/
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);

	function WikiController(Api, $window, $location, utils, StaticData, Params) {

		var wiki = this;

		wiki.api = Api;
		wiki.params = Params;
		wiki.languages = StaticData.getLanguages();
		wiki.projects = StaticData.getProjects();
		wiki.leadLarge = false;


		/*** PUBLIC METHODS ***/

		wiki.init = function () {
			Params.loadSettings();
			getPathTerm();
			wiki.search();
			$window.onhashchange = wiki.init;
		}; // init

		wiki.search = function () {
			resetResults();
			if(!getSearchTerm()) return;
			wiki.updateSearchTerm();
			Api.search();
			Params.saveSettings();
		}; // search

		wiki.open = function (title) {
			resetLeadArticle();
			utils.scrollToTop(300);
			Params.setArticleTitle(title);
			Api.open();
		}; // open

		wiki.searchForLeadTerm = function () {
			wiki.updateSearchTerm(wiki.api.page.title);
			wiki.search();
			wiki.toggleLeadLarge();
		}; // searchForLeadTerm

		wiki.toggleLeadLarge = function () {
			wiki.leadLarge = !wiki.leadLarge;
		}; // toggleLeadLarge

		wiki.selectText = function () {
			var text = $window.getSelection().toString();
			setSearchTerm(text);
		}; // toggleLeadLarge

		wiki.checkMaxResults = function () {
			if (wiki.params.search.gsrlimit > 50) wiki.params.search.gsrlimit = 50;
		}; // checkMaxResults

		wiki.resetAndReload = function() {
			resetSearchTerm();
			$window.location.reload();
		};	// resetAndReload

		wiki.toggleSave = function() {
			Params.toggleSave();
		};	// toggleRemember

		wiki.updateSearchTerm = function(newTerm) {
			if(newTerm) setSearchTerm(newTerm);
			setPathTerm();
			Params.setFilteredTerm();
			Params.setArticleTitle(getSearchTerm());
		};	// updateSearchTerm


		/*** PRIVATE FUNCTIONS ***/

		function getSearchTerm() {
			return wiki.params.settings.searchTerm;
		}

		function setSearchTerm(term) {
			wiki.params.settings.searchTerm = term;
		}

		function resetSearchTerm() {
			setSearchTerm('');
			resetPath();
		}

		function resetLeadArticle(){
			wiki.api.page = '';
			wiki.api.imageThumbUrl = '';
			wiki.api.imageUrl = '';
		}	// resetLeadArticle

		function resetError() {
			wiki.api.error = "";
		}	// resetError

		function resetResults() {
			resetError();
			wiki.api.results = null;
			resetLeadArticle();
		} // resetResults

		function getPathTerm() {
			wiki.params.settings.searchTerm = $location.path().substr(1) || wiki.params.settings.searchTerm;
		}

		function setPathTerm() {
			$location.path(getSearchTerm());
		}

		function resetPath() {
			$location.path("");
		}

	} // WikiController

})();
