function ImagesController(ImagesService, ParamService) {
'use strict';

	var ctrl = this;
	ctrl.imagesService = ImagesService;
	ctrl.paramService = ParamService;

	ctrl.showLoadMore = function () {
		return ctrl.imagesService.results && ImagesService.showLoadMore;
	};	// showLoadMore

	ctrl.loadMore = function () {
		ImagesService.loadMore();
	};	// loadMore

} // ImagesController

module.exports = ImagesController;
