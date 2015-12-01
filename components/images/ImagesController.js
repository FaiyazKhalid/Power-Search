function ImagesController(ImagesService, ParamService) {
'use strict';

	var self = this;
	self.images = ImagesService;
	self.params = ParamService;

	self.showLoadMore = function () {
		return self.images.results && ImagesService.showLoadMore;
	};

	self.loadMore = function () {
		ImagesService.loadMore();
	};	// loadMore

} // ImagesController

module.exports = ImagesController;
