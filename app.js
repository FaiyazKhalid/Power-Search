'use strict';
/*
	TODO:
	// ada bojana opet ne radi zbog exactMatch
	// odvojiti localStorage

	// srediti galeriju https://blueimp.github.io/Bootstrap-Image-Gallery/
	// srediti opis http://stackoverflow.com/questions/26010257/bootstrap-3-css-image-caption-overlay
	// main.refreshLanguages() ne sluzi nicemu. ako nema drugog nacina, proveriti redom i sastaviti statican spisak
	// primer paramUrl u dokumentaciju

	BAG:
	dolazi do greske kada pretrazuje projekte na kojima nema jezik
*/
var angular = require('angular');
var ngSanitize = require('angular-sanitize');

var MainController = require('./controllers/MainController');
var utils = require('./services/utils');
var autofocus = require('./components/autofocus');

var Page = require('./services/Page');
var PageController = require('./controllers/PageController');

var Pages = require('./services/Pages');
var PagesController = require('./controllers/PagesController');

var Images = require('./services/Images');
var ImagesController = require('./controllers/ImagesController');
var images = require('./components/images/images');

var ImagePage = require('./services/ImagePage');
var ImagePageController = require('./controllers/ImagePageController');

var Params = require('./services/Params');
var ParamsController = require('./controllers/ParamsController');

var Projects = require('./services/Projects');
var Languages = require('./services/Languages');


angular
	.module('wikiModul', [ngSanitize])

	.controller('MainController', MainController)
	.controller('ImagesController', ImagesController)
	.controller('ImagePageController', ImagePageController)
	.controller('PagesController', PagesController)
	.controller('PageController', PageController)
	.controller('ParamsController', ParamsController)

	.directive('autofocus', ['$timeout', autofocus])
	.directive('images', images)

	.factory('utils', utils)
    .factory('Projects', Projects)
	.service('Languages', Languages)
	.service('Params', Params)
	.service('Pages', Pages)
	.service('Page', Page)
	.service('Images', Images)
	.service('ImagePage', ImagePage);
