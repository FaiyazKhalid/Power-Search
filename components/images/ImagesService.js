'use strict';

function ImagesService($http, $filter, ParamService, utils) {

    var images = this;
    var descriptionLength = utils.isDesktop() ? 60 : 30;
	images.results = null;
    images.exactMatch = null;


    /*** METHODS ***/

    	images.search = function() {
        images.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImageParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				if (!data.query) return noResults();
				images.results = data.query.pages;
				angular.forEach(images.results, handleDescription);
			})
			.error(handleErrors);
	}; // search


    images.clearResults = function(){
        images.error = null;
        images.results = null;
        images.exactMatch = null;
    };  // clearResults


    /*** HELPERS ***/

    function handleDescription(item) {
        if(item.imageinfo && item.imageinfo[0].extmetadata.ImageDescription) {
            item.desc = item.imageinfo[0].extmetadata.ImageDescription.value;
            item.desc = utils.htmlToPlaintext(item.desc);
            var originLength = item.desc.length;
            item.desc = $filter('limitTo')(item.desc, descriptionLength);
            var limitLength = item.desc.length;
            if (limitLength < originLength) item.desc += "...";
        }
	} // handleDescription

    function noResults() {
        images.noResultsMessage = utils.noResultsMessage;
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
