'use strict';
/*
TODO:
- srediti responsive header
- povecati load more dugme
- primer paramUrl u dokumentaciju
- ubaciti dugme reset settings
- mozda odvojiti header i params (search header komponenta, a param servis)
BAG:
- srediti preticanje rezultata i kucanja
- izbaciti ng-controller iz pages.html
*/
var angular = require('angular');
var ngSanitize = require('angular-sanitize');

var mainPage = require('./components/main-page/mainPageDirective');
var MainPageController = require('./components/main-page/MainPageController');
var MainPageService = require('./components/main-page/MainPageService');

var pages = require('./components/pages/pagesDirective');
var PagesController = require('./components/pages/PagesController');
var PagesService = require('./components/pages/PagesService');

var images = require('./components/images/imagesDirective');
var ImagesController = require('./components/images/ImagesController');
var ImagesService = require('./components/images/ImagesService');

var mainImage = require('./components/main-image/mainImageDirective');
var MainImageController = require('./components/main-image/MainImageController');
var MainImageService = require('./components/main-image/MainImageService');

var params = require('./components/params/paramsDirective');
var ParamsController = require('./components/params/ParamsController');
var ParamService = require('./components/params/ParamService');
var LanguagesService = require('./components/shared/LanguagesService');
var ProjectsService = require('./components/shared/ProjectsService');

var MainController = require('./components/shared/MainController');
var autofocus = require('./components/shared/autofocusDirective');
var imageOnload = require('./components/shared/imageOnloadDirective');
var forkme = require('./components/shared/forkmeDirective');
var utils = require('./components/shared/utils');


angular
	.module('wikiModul', [ngSanitize])

	.controller('MainController', MainController)
	.controller('ImagesController', ImagesController)
	.controller('MainImageController', MainImageController)
	.controller('PagesController', PagesController)
	.controller('MainPageController', MainPageController)
	.controller('ParamsController', ParamsController)

	.directive('autofocus', ['$timeout', autofocus])
	.directive('imageOnload', imageOnload)
	.directive('images', images)
	.directive('mainPage', mainPage)
	.directive('pages', pages)
	.directive('params', params)
	.directive('forkme', forkme)
	.directive('mainImage', mainImage)

	.factory('utils', utils)
    .service('ProjectsService', ProjectsService)
	.service('LanguagesService', LanguagesService)
	.service('ParamService', ParamService)
	.service('PagesService', PagesService)
	.service('MainPageService', MainPageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
