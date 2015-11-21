function ImagesController(ImagesService, ParamService) {
'use strict';

	var imagesControl = this;
	imagesControl.images = ImagesService;
	imagesControl.params = ParamService;

} // ImagesController

module.exports = ImagesController;
