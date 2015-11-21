function ParamsController(ParamService, ProjectsService, LanguagesService, utils) {
'use strict';

	var paramsControl = this;
	paramsControl.params = ParamService;
	paramsControl.languages = LanguagesService;
    paramsControl.projects = ProjectsService.getProjects();

    LanguagesService.get();


	/*** PUBLIC METHODS ***/

    paramsControl.checkMaxResults = function () {
		if (paramsControl.params.pages.gsrlimit > 50) paramsControl.params.pages.gsrlimit = 50;
	}; // checkMaxResults

    paramsControl.isSelectedProject = function(project) {
		return paramsControl.params.settings.domain == project.name;
	};	// isChosenProject

    paramsControl.toggleSave = function() {
		ParamService.toggleSave();
	};	// toggleRemember

	paramsControl.resetAndReload = function() {
		resetSearchTerm();
		utils.reload();
	};	// resetAndReload

    paramsControl.refreshLanguages = function() {
		LanguagesService.get();
	};

    paramsControl.isCommons = function() {
      return ParamService.isCommons();
  };


	/*** PRIVATE FUNCTIONS ***/

    function resetSearchTerm() {
		ParamService.setSearchTerm('');
		utils.resetPath();
	}


} // ParamsController

module.exports = ParamsController;
