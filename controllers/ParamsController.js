function ParamsController(Params) {
'use strict';

	var pc = this;
	pc.params = Params;


	/*** PUBLIC METHODS ***/

    pc.checkMaxResults = function () {
		if (pc.params.search.gsrlimit > 50) pc.params.search.gsrlimit = 50;
	}; // checkMaxResults

    pc.isSelectedProject = function(project) {
		return pc.params.settings.domain == project.name;
	};	// isChosenProject

    pc.toggleSave = function() {
		Params.toggleSave();
	};	// toggleRemember


} // ParamsController

module.exports = ParamsController;
