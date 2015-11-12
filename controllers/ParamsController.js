function ParamsController(Params, $window, $location) {
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

	pc.resetAndReload = function() {
		resetSearchTerm();
		$window.location.reload();
	};	// resetAndReload


	/*** PRIVATE FUNCTIONS ***/
    
    function resetSearchTerm() {
		Params.setSearchTerm('');
		resetPath();
	}

    function resetPath() {
        $location.path("");
    }


} // ParamsController

module.exports = ParamsController;
