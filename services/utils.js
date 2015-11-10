'use strict';

function utils() {

    function replaceSpacesWithUnderscores(struna) {
        return struna.replace(/ /g, "_");
    } // replaceSpacesWithUnderscores


    function scrollToTop(duration) {
        var scrollStep = -window.scrollY / (duration / 15),
            scrollInterval = setInterval(function() {
                if (window.scrollY === 0) {
                    clearInterval(scrollInterval);
                    return;
                }
                window.scrollBy(0, scrollStep);
            }, 15);
    } // scrollToTop


    function capitalize(words) {
        return words.replace(/(?:^|\s)\S/g, function(word) {
            return word.toUpperCase();
        });
    } // capitalize


    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } // capitalizeFirst


    function serialize(params) {
        var paramString = Object.keys(params).map(function(key) {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
        return (paramString);
    } // serialize

    function startsWith(string, prefix) {
        return string.slice(0, prefix.length) == prefix;
    }	// startsWith


    return {
		replaceSpacesWithUnderscores: replaceSpacesWithUnderscores,
		scrollToTop: scrollToTop,
		capitalize: capitalize,
		capitalizeFirst: capitalizeFirst,
		serialize: serialize,
		startsWith: startsWith
	};

} // utils

module.exports = utils;
