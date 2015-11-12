'use strict';
/*
	TODO:
	// odvojiti poseban html element za komons slike, fotogalerija
	// odvojiti servise za Page, Pages, Images
	// napraviti da se glavna slika prikazuje popup?
	// srediti galeriju https://blueimp.github.io/Bootstrap-Image-Gallery/
	// srediti opis http://stackoverflow.com/questions/26010257/bootstrap-3-css-image-caption-overlay
	// wiki.refreshLanguages() ne sluzi nicemu. ako nema drugog nacina, proveriti redom i sastaviti statican spisak
	// primer paramUrl u dokumentaciju

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema jezik
*/

var angular = require('angular');
var ngSanitize = require('angular-sanitize');

var WikiController = require('./controllers/WikiController');
var ImageController = require('./controllers/ImageController');
var PagesController = require('./controllers/PagesController');
var LeadController = require('./controllers/LeadController');
var autofocus = require('./directives/autofocus');

var utils = require('./services/utils');
var Projects = require('./services/Projects');
var Languages = require('./services/Languages');
var Params = require('./services/Params');
var Images = require('./services/Images');
var Pages = require('./services/Pages');
var Lead = require('./services/Lead');


angular
	.module('wikiModul', [ngSanitize])

	.controller('WikiController', WikiController)
	.controller('ImageController', ImageController)
	.controller('PagesController', PagesController)
	.controller('LeadController', LeadController)
	.directive('autofocus', ['$timeout', autofocus])

	.factory('utils', utils)
    .factory('Projects', Projects)
	.service('Languages', Languages)
	.service('Params', Params)
	.service('Pages', Pages)
	.service('Lead', Lead)
	.service('Images', Images);
