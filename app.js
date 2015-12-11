'use strict';
/*
TODO:
- final refactor naziva servisa, direktiva i sl
- srediti responsive css (posebno bug za slike)
- primer paramUrl u dokumentaciju
- izbaciti mainControl iz page.html i params.html
- ubaciti dugme reset settings

BAG:
- srediti preticanje rezultata i kucanja
*/
var angular = require('angular');
var ngSanitize = require('angular-sanitize');

var mainPage = require('./components/main-page/pageDirective');
var PageController = require('./components/main-page/PageController');
var PageService = require('./components/main-page/PageService');

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
var forkme = require('./components/forkme/forkmeDirective');
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
	.service('PageService', PageService)
	.service('ImagesService', ImagesService)
	.service('MainImageService', MainImageService);
