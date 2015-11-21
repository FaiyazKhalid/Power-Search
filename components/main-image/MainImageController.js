function MainImageController(MainImageService, ParamService) {
'use strict';

	var mainImgControl = this;
	mainImgControl.mainImage = MainImageService;
	mainImgControl.params = ParamService;


} // MainImageController

module.exports = MainImageController;
