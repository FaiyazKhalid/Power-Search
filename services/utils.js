(function () {
	'use strict';
	angular
		.module("wikiModul")
		.factory('utils', utils);


	function utils() {

		return {
			replaceSpacesWithUnderscores: replaceSpacesWithUnderscores,
			scrollToTop: scrollToTop,
			capitalize: capitalize,
			capitalizeFirst: capitalizeFirst,
			serialize: serialize,
			createParamUrl: createParamUrl
		};


		/* UTILS METHODS */

		function replaceSpacesWithUnderscores(struna) {
			return struna.replace(/ /g, "_");
		} // replaceSpacesWithUnderscores


		function scrollToTop(duration) {
			var scrollStep = -window.scrollY / (duration / 15),
				scrollInterval = setInterval(function () {
					if (window.scrollY === 0) {
						clearInterval(scrollInterval);
						return;
					}
					window.scrollBy(0, scrollStep);
				}, 15);
		} // scrollToTop


		function capitalize(struna) {
			return struna.replace(/(?:^|\s)\S/g, function (a) {
				return a.toUpperCase();
			});
		}	// capitalize


		function capitalizeFirst(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} // capitalizeFirst


		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + encodeURIComponent(params[key]);
			}).join('&');
			return (paramString);
		} // serialize


		function createParamUrl(params, commonParams, apiUrl) {
			angular.extend(params, commonParams);
			var paramUrl = apiUrl + '?' + serialize(params);
			return paramUrl;
		} // createParamUrl


	} // utils

})();
