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

var autofocus = require('./components/autofocus');

var MainController = require('./controllers/MainController');
var PageController = require('./controllers/PageController');
var PagesController = require('./controllers/PagesController');

var images = require('./components/images/images');
var ImagesController = require('./components/images/ImagesController');

var mainImage = require('./components/main-image/mainImage');
var MainImageController = require('./components/main-image/MainImageController');

var ParamsController = require('./controllers/ParamsController');

var Params = require('./services/Params');
var Page = require('./services/Page');
var Pages = require('./services/Pages');
var MainImage = require('./services/MainImage');
var Images = require('./services/Images');
var Projects = require('./services/Projects');
var Languages = require('./services/Languages');
var utils = require('./services/utils');


angular
	.module('wikiModul', [ngSanitize])

	.controller('MainController', MainController)
	.controller('ImagesController', ImagesController)
	.controller('MainImageController', MainImageController)
	.controller('PagesController', PagesController)
	.controller('PageController', PageController)
	.controller('ParamsController', ParamsController)

	.directive('autofocus', ['$timeout', autofocus])
	.directive('images', images)
	.directive('mainImage', mainImage)

	.factory('utils', utils)
    .factory('Projects', Projects)
	.service('Languages', Languages)
	.service('Params', Params)
	.service('Pages', Pages)
	.service('Page', Page)
	.service('Images', Images)
	.service('MainImage', MainImage);
