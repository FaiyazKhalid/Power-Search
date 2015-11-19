function ImagesController(ImagesService, ParamsService) {
'use strict';

	var imagesControl = this;
	imagesControl.images = ImagesService;
	imagesControl.params = ParamsService;

} // ImagesController

module.exports = ImagesController;
