'use strict';

function pages() {
	return {
		controller: 'PagesController',
		controllerAs: 'pagesControl',
		bindToController: {
			open: '='
		},
		templateUrl: 'components/pages/pages.html'
	};
} // pages

module.exports = pages;
