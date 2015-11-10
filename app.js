'use strict';
/*
	TODO:
	// kad se promeni domen, osveziti info za jezik
	// prikazivati jezike na osnovu izabranog domena

	// primer paramUrl u dokumentaciju
	// gulp za pakovanje i minifikovanje js fajlova

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema jezik
*/

var angular = require('angular');
var ngSanitize = require('angular-sanitize');
var WikiController = require('./controllers/WikiController');
var LanguageController = require('./controllers/LanguageController');
var autofocus = require('./directives/autofocus');
var utils = require('./services/utils');
var Projects = require('./services/Projects');
var LanguageService = require('./services/LanguageService');
var Params = require('./services/Params');
var Api = require('./services/Api');


angular
	.module('wikiModul', [ngSanitize])
	.controller('WikiController', WikiController)
	.controller('LanguageController', LanguageController)
	.directive('autofocus', ['$timeout', autofocus])
    .factory('utils', utils)
    .factory('Projects', Projects)
	.service('LanguageService', LanguageService)
	.service('Params', Params)
	.service('Api', Api);
