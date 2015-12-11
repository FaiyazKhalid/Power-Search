'use strict';

function mainPage() {
	return {
		controller: 'mainPageController',
		controllerAs: 'pageCtrl',
		bindToController: {
			open: '=',
			large: '='
		},
		templateUrl: 'components/main-page/main-page.html'
	};
} // mainPage

module.exports = mainPage;
