function MainImageController(MainImageService, ParamService) {
'use strict';

	var ctrl = this;
	ctrl.mainImageService = MainImageService;
	ctrl.paramService = ParamService;

	/* METHODS */

	ctrl.isEmptyExtract = function() {
		if (!ctrl.mainImageService.result) return true;
		return ctrl.mainImageService.result.extract === "...";	// is empty
	};

} // MainImageController

module.exports = MainImageController;
