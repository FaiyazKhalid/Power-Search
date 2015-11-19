function MainImageController(MainImageService, ParamsService) {
'use strict';

	var mainImgControl = this;
	mainImgControl.mainImage = MainImageService;
	mainImgControl.params = ParamsService;


} // MainImageController

module.exports = MainImageController;
