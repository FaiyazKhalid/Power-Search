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

var page = require('./components/page/page');
var PageController = require('./components/page/PageController');
var PageService = require('./components/page/PageService');

var pages = require('./components/pages/pages');
var PagesController = require('./components/pages/PagesController');
var PagesService = require('./components/pages/PagesService');

var images = require('./components/images/images');
var ImagesController = require('./components/images/ImagesController');
var ImagesService = require('./components/images/ImagesService');

var mainImage = require('./components/main-image/mainImage');
var MainImageController = require('./components/main-image/MainImageController');
var MainImageService = require('./components/main-image/MainImageService');

var ParamsController = require('./components/params/ParamsController');
var ParamsService = require('./components/params/ParamsService');
var LanguagesService = require('./components/params/LanguagesService');
var ProjectsService = require('./components/params/ProjectsService');

var MainController = require('./components/shared/MainController');
var autofocus = require('./components/shared/autofocus');
var utils = require('./components/shared/utils');


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
	.directive('page', page)
	.directive('pages', pages)
	.directive('mainImage', mainImage)

	.factory('utils', utils)
    .factory('ProjectsService', ProjectsService)
	.service('LanguagesService', LanguagesService)
	.service('ParamsService', ParamsService)
	.service('PagesService', PagesService)
	.service('PageService', PageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
