'use strict';
/*
TODO:
- srediti jezike
- srediti responsive css
- final refactor naziva servisa, direktiva i sl
- primer paramUrl u dokumentaciju
- izbaciti mainControl iz page.html i params.html

BAG:
- kad sa komonsa prebacim na wikirečnik, dodje do greske jer je jezik null
- srediti preticanje rezultata i kucanja
*/
var angular = require('angular');
var ngSanitize = require('angular-sanitize');

var page = require('./components/main-page/page');
var PageController = require('./components/main-page/PageController');
var PageService = require('./components/main-page/PageService');

var pages = require('./components/pages/pages');
var PagesController = require('./components/pages/PagesController');
var PagesService = require('./components/pages/PagesService');

var images = require('./components/images/images');
var ImagesController = require('./components/images/ImagesController');
var ImagesService = require('./components/images/ImagesService');

var mainImage = require('./components/main-image/mainImage');
var MainImageController = require('./components/main-image/MainImageController');
var MainImageService = require('./components/main-image/MainImageService');

var params = require('./components/params/params');
var ParamsController = require('./components/params/ParamsController');
var ParamService = require('./components/params/ParamService');
var LanguagesService = require('./components/params/LanguagesService');
var ProjectsService = require('./components/params/ProjectsService');

var MainController = require('./components/shared/MainController');
var autofocus = require('./components/shared/autofocus');
var utils = require('./components/shared/utils');
var forkme = require('./components/forkme/forkme');


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
	.directive('params', params)
	.directive('forkme', forkme)
	.directive('mainImage', mainImage)

	.factory('utils', utils)
    .factory('ProjectsService', ProjectsService)
	.service('LanguagesService', LanguagesService)
	.service('ParamService', ParamService)
	.service('PagesService', PagesService)
	.service('PageService', PageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
