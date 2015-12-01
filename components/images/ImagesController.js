function ImagesController(ImagesService, ParamService) {
'use strict';

	var imagesControl = this;
	imagesControl.images = ImagesService;
	imagesControl.params = ParamService;

	imagesControl.showLoadMore = function () {
		return imagesControl.images.results && ImagesService.showLoadMore;
	};

	imagesControl.loadMore = function () {
		ImagesService.loadMore();
	};	// loadMore

} // ImagesController

module.exports = ImagesController;
