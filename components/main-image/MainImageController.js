function MainImageController(MainImageService, ParamService) {
'use strict';

	var self = this;
	self.mainImage = MainImageService;
	self.params = ParamService;

	self.noExtract = function() {
		if (!self.mainImage.result) return true;
		return self.mainImage.result.extract === "...";
	};

} // MainImageController

module.exports = MainImageController;
