function MainImageController(MainImageService, ParamService) {
'use strict';

	var ctrl = this;
	ctrl.mainImage = MainImageService;
	ctrl.params = ParamService;

	ctrl.noExtract = function() {
		if (!ctrl.mainImage.result) return true;
		return ctrl.mainImage.result.extract === "...";
	};

} // MainImageController

module.exports = MainImageController;
