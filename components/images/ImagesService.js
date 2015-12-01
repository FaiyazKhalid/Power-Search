'use strict';

function ImagesService($http, $filter, ParamService, utils) {

    var self = this;
    var descriptionLength = utils.isDesktop() ? 60 : 30;
	self.results = null;
    self.exactMatch = null;
    self.showLoadMore = true;


    /*** METHODS ***/

    self.search = function() {
        self.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImageParams());
		// console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				if (!data.query) return noResults();
				self.results = data.query.pages;
                self.toggleLoadMore(Boolean(data.continue));
                if (data.continue) self.offset = data.continue.gsroffset;
				angular.forEach(self.results, handleDescription);
			})
			.error(handleErrors);
	}; // search


    self.clearResults = function(){
        self.error = null;
        self.results = null;
        self.exactMatch = null;
    };  // clearResults


    self.loadMore = function () {
        ParamService.setOffset(self.offset);
        var paramUrl = ParamService.createParamUrl(ParamService.getImageParams());
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                self.toggleLoadMore(Boolean(data.continue));
                if (data.continue) self.offset = data.continue.gsroffset;
                if (!data.query) return;
                self.results = self.results.concat(data.query.pages);
			});
    };  // loadMore


    self.toggleLoadMore = function(bool) {
        self.showLoadMore = bool;
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
        self.noResultsMessage = utils.noResultsMessage;
    }   // noResults

	function handleErrors(data, status) {
        if(status == 404) {
            self.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		self.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // ImagesService


module.exports = ImagesService;
