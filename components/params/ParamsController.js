function ParamsController(ParamService, ProjectsService, LanguagesService, utils) {
'use strict';

    LanguagesService.get();
    ProjectsService.get();


	var self = this;
	self.params = ParamService;
	self.languages = LanguagesService;
    self.projects = ProjectsService;


	/*** PUBLIC METHODS ***/

    self.checkMaxResults = function () {
		if (self.params.pages.gsrlimit > 50) self.params.pages.gsrlimit = 50;
	}; // checkMaxResults

    self.isSelectedProject = function(project) {
		return self.params.settings.domain == project.name;
	};	// isChosenProject

    self.toggleSave = function() {
		ParamService.toggleSave();
	};	// toggleRemember

	self.resetAndReload = function() {
		resetSearchTerm();
		utils.reload();
	};	// resetAndReload

    self.refreshLanguages = function() {
		LanguagesService.get();
	};

    self.isCommons = function() {
      return ParamService.isCommons();
  };


	/*** PRIVATE FUNCTIONS ***/

    function resetSearchTerm() {
		ParamService.setSearchTerm('');
		utils.reupdatePath();
	}


} // ParamsController

module.exports = ParamsController;
