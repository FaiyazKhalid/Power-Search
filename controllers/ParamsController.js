function ParamsController(Params, Projects, Languages, utils) {
'use strict';

	var paramsControl = this;
	paramsControl.params = Params;
	paramsControl.languages = Languages;
    paramsControl.projects = Projects.getProjects();

    Languages.get();


	/*** PUBLIC METHODS ***/

    paramsControl.checkMaxResults = function () {
		if (paramsControl.params.pages.gsrlimit > 50) paramsControl.params.pages.gsrlimit = 50;
	}; // checkMaxResults

    paramsControl.isSelectedProject = function(project) {
		return paramsControl.params.settings.domain == project.name;
	};	// isChosenProject

    paramsControl.toggleSave = function() {
		Params.toggleSave();
	};	// toggleRemember

	paramsControl.resetAndReload = function() {
		resetSearchTerm();
		utils.reload();
	};	// resetAndReload

    paramsControl.refreshLanguages = function() {
		Languages.get();
	};

    paramsControl.isCommons = function() {
      return Params.isCommons();
  };


	/*** PRIVATE FUNCTIONS ***/

    function resetSearchTerm() {
		Params.setSearchTerm('');
		utils.resetPath();
	}


} // ParamsController

module.exports = ParamsController;
