'use strict';

function ImagesService($http, $filter, ParamService, utils) {

    var images = this;
    var descriptionLength = 60;
	images.results = null;
    images.exactMatch = null;


    /*** HTTP ***/

	images.search = function() {
		var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImageParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                images.exactMatch = null;
				if (!data.query) return noResults();
				images.results = data.query.pages;
				angular.forEach(images.results, addDescription);
			})
			.error(handleErrors);
	}; // search

    images.clearResults = function(){
        images.results = null;
    };


    /*** HELPERS ***/

    function addDescription(item) {
        if(item.imageinfo && item.imageinfo[0].extmetadata.ImageDescription) {
            item.desc = item.imageinfo[0].extmetadata.ImageDescription.value;
            item.desc = utils.htmlToPlaintext(item.desc);
            var originLength = item.desc.length;
            item.desc = $filter('limitTo')(item.desc, descriptionLength);
            var limitLength = item.desc.length;
            if (limitLength < originLength) item.desc += "...";
        }
	} // addDescription

    function noResults() {
        images.noResults = utils.noResultsMessage;
    }   // noResults

	function handleErrors(data, status) {
        if(status == 404) {
            images.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		images.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // ImagesService


module.exports = ImagesService;
