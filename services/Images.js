'use strict';

function Images($http, utils) {

    var images = this;
	images.results = null;

    images.params = {
        action: 'query',
        prop: 'pageimages|info|imageinfo',
		inprop: 'url', // return page url
        iiprop: 'extmetadata',
		format: 'json',
		formatversion: 2,
		callback: 'JSON_CALLBACK',
        generator: 'search',
        gsrsearch: 'dada',  // searchTerm + searchFilter
        gsrnamespace: 6, // 0: article, 6: file
        gsrlimit: 20, // broj rezultata, max 50
        pilimit: 'max', // thumb image for all articles
        pithumbsize: 200	// thumb height
    };


    /*** HTTP ***/

	images.search = function() {
        images.noResults = "";
		var paramUrl = 'http://commons.wikimedia.org/w/api.php?' + utils.serialize(images.params);
		//console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				if (!data.query) return noResults();
				images.results = data.query.pages;
				angular.forEach(images.results, findDescription);
			})
			.error(handleErrors);
	}; // search

    images.clearResults = function(){
        images.results = null;
    };


    /*** HELPERS ***/

    function findDescription(thisImage) {
        thisImage.desc = thisImage.imageinfo[0].extmetadata.ImageDescription.value;
	} // findDescription

	function handleErrors(data, status) {
        if(status == 404) {
            images.error = "The wiki domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		images.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors

    function noResults() {
        images.noResults = "No results for the search term. Try again with different criteria.";
    }


} // Images


module.exports = Images;
