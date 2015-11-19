'use strict';

function pages() {
	return {
		controller: 'PagesController',
		controllerAs: 'pagesControl',
        templateUrl: 'components/pages/pages.html'
	};
} // pages

module.exports = pages;
