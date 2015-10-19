(function () {

	// napraviti funkciju koja pretrazuje strane
	// objediniti funkcije da se obe pozivaju iz jedne na svaku promenu
	// ako ima jedan rezultat, prikazuje jedan, ako ima vise lista ih

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiKontrol', WikiKontrol);


	function WikiKontrol($http) {

		var wiki = this;
		wiki.term = 'Buddha';
		wiki.json = {};	// samo u razvoju, posle obrisati
		wiki.page = null;
		wiki.results = [];
		wiki.error = "";


		/*** PUBLIC METHODS ***/

		wiki.loadPage = function (searchTerm) {

			var params = {
				action: 'query',
				prop: 'extracts|pageimages|pageterms',
				redirects: '',
				titles: searchTerm
			};
			var paramUrl = createParamUrl(params, searchTerm);

			$http.jsonp(paramUrl)
				.success(function (data) {
					wiki.json = data.query;
					var page = wiki.json.pages[0];

					if(page.extract) {
						wiki.page = page;
					} else {
						wiki.page = {};
					}
				})
				.error(function(){
					wiki.error = "Oh no, there was some error in geting data.";
				});

		}; // loadPage


		wiki.searchWikipedia = function(searchTerm){

			var params = {
				action: 'query',
				list: 'search',
				srsearch: searchTerm
			};
			var paramUrl = createParamUrl(params, searchTerm);

			$http.jsonp(paramUrl)
				.success(function (data) {
					wiki.json = data.query;
					wiki.results = data.query.search;
				})
				.error(function(){
					wiki.error = "Oh no, there was some error in geting data.";
				});

		};	// searchWikipedia



		/*** HELPER FUNCTIONS ***/

		function createParamUrl(params) {
			var apiUrl = 'http://en.wikipedia.org/w/api.php';
			// default params for all
			params.format = 'json';
			params.formatversion = 2;
			params.callback = 'JSON_CALLBACK';
			var paramUrl = apiUrl + '?' + serialize(params);
			return paramUrl;
		} // createParamUrl

		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + params[key];
			}).join('&');
			return paramString;
		} // serialize

	} // WikiKontrol

})();
