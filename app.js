// browserify app.js -o bundle.js
/*
	TODO:
	// ucitati jezike za svaki projekat
	// prikazivati jezike na osnovu izabranog domena

	// primer paramUrl u dokumentaciju
	// gulp za pakovanje i minifikovanje js fajlova

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema jezik
*/
'use strict';
var angular = require('angular');
var ngSanitize = require('angular-sanitize');
var WikiController = require('./controllers/WikiController');
var LanguageController = require('./controllers/LanguageController');
var autofocus = require('./directives/autofocus');
var utils = require('./services/utils');
var StaticData = require('./services/StaticData');
var LanguageService = require('./services/LanguageService');
var Params = require('./services/Params');
var Api = require('./services/Api');



angular
	.module('wikiModul', [ngSanitize])
	.controller('WikiController', WikiController)
	.controller('LanguageController', LanguageController)
	.directive('autofocus', ['$timeout', autofocus])
    .factory('utils', utils)
    .factory('StaticData', StaticData)
	.service('LanguageService', LanguageService)
	.service('Params', Params)
	.service('Api', Api);
