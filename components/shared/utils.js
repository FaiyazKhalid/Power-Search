'use strict';

function utils($window, $location) {

	var noResultsMessage = "No results for the search term. Try again with different criteria.";

	/*** FUNCTIONS ***/

	function updatePath(term) {
		$location.path(term);
	} // updatePath

	function getPath() {
		return $location.path().substr(1);
	} // updatePath

	function resetPath() {
		$location.path("");
	}  // resetPath

	function reload() {
		$window.location.reload();
	}  // reload

    function getSelection() {
      return $window.getSelection().toString();
  	}   // getSelection

	function replaceSpacesWithUnderscores(struna) {
		return struna.replace(/ /g, "_");
	} // replaceSpacesWithUnderscores

	function scrollToTop(duration) {
		var top = document.getElementsByTagName("header")[0].clientHeight;
		var scrollStep = -$window.scrollY / (duration / 15);
		var scrollInterval = setInterval(function () {
			if ($window.scrollY <= top) {
				clearInterval(scrollInterval);
				return;
			}
			$window.scrollBy(0, scrollStep);
		}, 15);
	} // scrollToTop

	function capitalize(words) {
		return words.replace(/(?:^|\s)\S/g, function (word) {
			return word.toUpperCase();
		});
	} // capitalize

	function capitalizeFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	} // capitalizeFirst

	function serialize(params) {
		var paramString = Object.keys(params).map(function (key) {
			return key + '=' + encodeURIComponent(params[key]);
		}).join('&');
		return (paramString);
	} // serialize

	function startsWith(string, prefix) {
		return string.slice(0, prefix.length) == prefix;
	} // startsWith

	function htmlToPlaintext(text) {
		return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	}

	function isDesktop() {
        return window.innerWidth > 992;
    } // isDesktop


	/*** PUBLIC ***/

	return {
		noResultsMessage: noResultsMessage,
		isDesktop: isDesktop,
		replaceSpacesWithUnderscores: replaceSpacesWithUnderscores,
		scrollToTop: scrollToTop,
		capitalize: capitalize,
		capitalizeFirst: capitalizeFirst,
		serialize: serialize,
		startsWith: startsWith,
		htmlToPlaintext: htmlToPlaintext,
		updatePath: updatePath,
		getPath: getPath,
		resetPath: resetPath,
        reload: reload,
        getSelection: getSelection
	};

} // utils

module.exports = utils;
