(function () {
	'use strict';
	angular
		.module("wikiModul")
		.factory('utils', utils);


	function utils() {

		return {
			scrollToTop: scrollToTop,
			capitalizeFirst: capitalizeFirst,
			serialize: serialize
		};

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

		function capitalizeFirst(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} // capitalizeFirst

		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + encodeURIComponent(params[key]);
			}).join('&');
			return (paramString);
		} // serialize

	} // utils

})();
