function ImagesController(ImagesService, ParamService) {
'use strict';

	var ctrl = this;
	ctrl.images = ImagesService;
	ctrl.params = ParamService;

	ctrl.showLoadMore = function () {
		return ctrl.images.results && ImagesService.showLoadMore;
	};

	ctrl.loadMore = function () {
		ImagesService.loadMore();
	};	// loadMore

} // ImagesController

module.exports = ImagesController;
