function MainImageController(MainImageService, ParamService) {
'use strict';

	var mainImgControl = this;
	mainImgControl.mainImage = MainImageService;
	mainImgControl.params = ParamService;

	mainImgControl.noExtract = function() {
		if (!mainImgControl.mainImage.result) return true;
		return mainImgControl.mainImage.result.extract === "...";
	};

} // MainImageController

module.exports = MainImageController;
