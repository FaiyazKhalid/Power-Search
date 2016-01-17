'use strict';
/*
TODO:
- primer paramUrl u dokumentaciju
BAG:
- srediti preticanje rezultata i kucanja
- kucam, brzo resetujem, obrise pa ga prestigne poslednji rezultat
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

var searchHeader = require('./components/search-header/searchHeadDirective');
var wikiProjects = require('./components/search-header/wikiProjectsDirective');
var SearchHeadController = require('./components/search-header/SearchHeadController');

var ParamService = require('./components/shared/ParamService');
var LanguagesService = require('./components/shared/LanguagesService');
var ProjectsService = require('./components/shared/ProjectsService');

var MainController = require('./components/shared/MainController');
var MainService = require('./components/shared/MainService');
var autofocus = require('./components/shared/autofocusDirective');
var utils = require('./components/shared/utils');


angular
	.module('wikiModul', [ngSanitize])

	.controller('MainController', MainController)
	.controller('ImagesController', ImagesController)
	.controller('MainImageController', MainImageController)
	.controller('PagesController', PagesController)
	.controller('MainPageController', MainPageController)
	.controller('SearchHeadController', SearchHeadController)

	.directive('searchHeader', searchHeader)
	.directive('wikiProjects', wikiProjects)
	.directive('images', images)
	.directive('mainPage', mainPage)
	.directive('pages', pages)
	.directive('mainImage', mainImage)
	.directive('autofocus', ['$timeout', autofocus])

	.factory('utils', utils)
	.service('MainService', MainService)
    .service('ProjectsService', ProjectsService)
	.service('LanguagesService', LanguagesService)
	.service('ParamService', ParamService)
	.service('PagesService', PagesService)
	.service('MainPageService', MainPageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
