function ParamsController(ParamService, ProjectsService, LanguagesService, utils) {
'use strict';

    LanguagesService.get();
    ProjectsService.get();

	var ctrl = this;
    ctrl.paramService = ParamService;
	ctrl.languageService = LanguagesService;
    ctrl.projectService = ProjectsService;


	/*** PUBLIC METHODS ***/

    ctrl.checkMaxResults = function () {
		if (ctrl.paramService.pages.gsrlimit > 50) ctrl.paramService.pages.gsrlimit = 50;
	}; // checkMaxResults

    ctrl.isSelectedProject = function(project) {
		return ctrl.paramService.settings.domain == project.name;
	};	// isChosenProject

    ctrl.toggleSave = function() {
		ParamService.toggleSave();
	};	// toggleRemember

	ctrl.resetAndReload = function() {
		resetSearchTerm();
		utils.reload();
	};	// resetAndReload

    ctrl.refreshLanguages = function() {
		LanguagesService.get();
	};

    ctrl.refreshProjects = function() {
        ProjectsService.get();
    };

    ctrl.isCommons = function() {
      return ParamService.isCommons();
  };


	/*** PRIVATE FUNCTIONS ***/

    function resetSearchTerm() {
		ParamService.setSearchTerm('');
		utils.reupdatePath();
	}


} // ParamsController

module.exports = ParamsController;
