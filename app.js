'use strict';
/*
TODO:
- mozda odvojiti header i params (search header komponenta, a param servis)
- srediti responsive header
- primer paramUrl u dokumentaciju
- optimizovati
BAG:
- srediti preticanje rezultata i kucanja
- kucam, brzo resetujem, obrise pa ga prestigne poslednji rezultat
- izbaciti ng-controller iz pages.html i params.html
TRIVIA:
- napraviti jedno loadmore dugme umesto dva
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

var searchHeader = require('./components/search-header/searchHeaderDirective');
var SearchHeaderController = require('./components/search-header/SearchHeaderController');
var ParamService = require('./components/search-header/ParamService');
var LanguagesService = require('./components/shared/LanguagesService');
var ProjectsService = require('./components/shared/ProjectsService');

var MainController = require('./components/shared/MainController');
var MainService = require('./components/shared/MainService');
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
	.controller('SearchHeaderController', SearchHeaderController)

	.directive('autofocus', ['$timeout', autofocus])
	.directive('imageOnload', imageOnload)
	.directive('images', images)
	.directive('mainPage', mainPage)
	.directive('pages', pages)
	.directive('searchHeader', searchHeader)
	.directive('forkme', forkme)
	.directive('mainImage', mainImage)

	.factory('utils', utils)
	.service('MainService', MainService)
    .service('ProjectsService', ProjectsService)
	.service('LanguagesService', LanguagesService)
	.service('ParamService', ParamService)
	.service('PagesService', PagesService)
	.service('MainPageService', MainPageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
