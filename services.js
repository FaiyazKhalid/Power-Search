(function () {
	'use strict';
	angular
		.module("wikiModul")
		.factory('utils', utils);


	function utils() {

		return {
			scrollToTop: scrollToTop,
            wikiParseFilename: wikiParseFilename,
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

        function wikiParseFilename(name) {
			var filename = name.replace(/ /g, "_");
			var digest = md5(filename);
			return digest[0] + '/' + digest[0] + digest[1] + '/' + encodeURIComponent(filename);
		} // wikiParseFilename

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
