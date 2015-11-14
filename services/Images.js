'use strict';

function Images($http, Params, utils) {

    var images = this;
	images.results = null;

    /*** HTTP ***/

	images.search = function() {
        //images.noResults = "";
		var paramUrl = Params.getApiUrl() + '?' + utils.serialize(Params.getImageParams());
		console.log(paramUrl);
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
        if(thisImage.imageinfo && thisImage.imageinfo[0].extmetadata.ImageDescription) {
            thisImage.desc = thisImage.imageinfo[0].extmetadata.ImageDescription.value;
        }
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
