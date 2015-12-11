'use strict';

function ImagesService($http, $filter, ParamService, utils) {

    var service = this;
    var descriptionLength = utils.isDesktop() ? 60 : 30;
	service.results = null;
    service.exactMatch = null;
    service.showLoadMore = true;


    /*** METHODS ***/

    service.search = function() {
        service.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImageParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				if (!data.query) return noResults();
				service.results = data.query.pages;
                service.toggleLoadMore(Boolean(data.continue));
                if (data.continue) service.offset = data.continue.gsroffset;
				angular.forEach(service.results, handleDescription);
			})
			.error(handleErrors);
	}; // search


    service.clearResults = function(){
        service.error = null;
        service.results = null;
        service.exactMatch = null;
    };  // clearResults


    service.loadMore = function () {
        ParamService.setOffset(service.offset);
        var paramUrl = ParamService.createParamUrl(ParamService.getImageParams());
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                service.toggleLoadMore(Boolean(data.continue));
                if (data.continue) service.offset = data.continue.gsroffset;
                if (!data.query) return;
                service.results = service.results.concat(data.query.pages);
			});
    };  // loadMore


    service.toggleLoadMore = function(bool) {
        service.showLoadMore = bool;
    };


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
        service.noResultsMessage = utils.noResultsMessage;
    }   // noResults

	function handleErrors(data, status) {
        if(status == 404) {
            service.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		service.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // ImagesService


module.exports = ImagesService;
