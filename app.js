'use strict';
/*
	TODO:
	// napraviti da otvara glavnu komons stranu ako postoji termin
	// moze ili namespace 0, ili 6 bez prefixa

	// odvojiti poseban html element za komons slike, fotogalerija
	// odvojiti servise za Page, Pages, Images
	// napraviti da se glavna slika prikazuje popup?
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
var PageController = require('./controllers/PageController');
var PagesController = require('./controllers/PagesController');
var ImagesController = require('./controllers/ImagesController');
var ImagePageController = require('./controllers/ImagePageController');
var ParamsController = require('./controllers/ParamsController');

var autofocus = require('./directives/autofocus');

var utils = require('./services/utils');
var Projects = require('./services/Projects');
var Languages = require('./services/Languages');
var Params = require('./services/Params');
var Images = require('./services/Images');
var Pages = require('./services/Pages');
var Page = require('./services/Page');
var ImagePage = require('./services/ImagePage');


angular
	.module('wikiModul', [ngSanitize])
	.controller('MainController', MainController)
	.controller('ImagesController', ImagesController)
	.controller('ImagePageController', ImagePageController)
	.controller('PagesController', PagesController)
	.controller('PageController', PageController)
	.controller('ParamsController', ParamsController)
	.directive('autofocus', ['$timeout', autofocus])

	.factory('utils', utils)
    .factory('Projects', Projects)
	.service('Languages', Languages)
	.service('Params', Params)
	.service('Pages', Pages)
	.service('Page', Page)
	.service('Images', Images)
	.service('ImagePage', ImagePage);
