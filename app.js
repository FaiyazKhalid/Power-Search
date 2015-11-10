'use strict';
/*
	TODO:
	// primer paramUrl u dokumentaciju
	// gulp za pakovanje i minifikovanje js fajlova

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema jezik
*/

var angular = require('angular');
var ngSanitize = require('angular-sanitize');
var WikiController = require('./controllers/WikiController');
var autofocus = require('./directives/autofocus');
var utils = require('./services/utils');
var Projects = require('./services/Projects');
var Languages = require('./services/Languages');
var Params = require('./services/Params');
var Api = require('./services/Api');


angular
	.module('wikiModul', [ngSanitize])
	.controller('WikiController', WikiController)
	.directive('autofocus', ['$timeout', autofocus])
    .factory('utils', utils)
    .factory('Projects', Projects)
	.service('Languages', Languages)
	.service('Params', Params)
	.service('Api', Api);
