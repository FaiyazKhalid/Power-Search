'use strict';

function ImagesService($http, ParamService, utils, $filter) {

    var images = this;
    var descriptionLength = 60;
	images.results = null;

    /*** HTTP ***/

	images.search = function() {
		var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImageParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				if (!data.query) {
                    images.noResults = utils.noResultsMessage;
                    return;
                }
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
            thisImage.desc = utils.htmlToPlaintext(thisImage.desc);
            var originLength = thisImage.desc.length;
            thisImage.desc = $filter('limitTo')(thisImage.desc, descriptionLength);
            var limitLength = thisImage.desc.length;
            if (limitLength < originLength) thisImage.desc += "...";
        }
	} // findDescription

	function handleErrors(data, status) {
        if(status == 404) {
            images.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		images.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // ImagesService


module.exports = ImagesService;
