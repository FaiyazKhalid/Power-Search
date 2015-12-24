'use strict';
function MainController($window, utils, MainService, ParamService) {

	var ctrl = this;

	/*** PUBLIC METHODS ***/

	ctrl.init = function () {
		ParamService.loadSettings();
		if (utils.getPath()) ParamService.setSearchTerm(utils.getPath());
		ctrl.search();
		$window.onhashchange = ctrl.init;
	}; // init

	ctrl.search = function () {
		MainService.search();
	}; // search

	ctrl.open = function (title) {
		MainService.open(title);
	}; // open

	ctrl.selectText = function () {
		ParamService.setSearchTerm(utils.getSelection());
	}; // selectText


} // MainController

module.exports = MainController;
