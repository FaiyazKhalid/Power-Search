'use strict';

function mainPage() {
	return {
		controller: 'MainPageController',
		controllerAs: 'pageCtrl',
		bindToController: {
			open: '=',
			large: '='
		},
		templateUrl: 'components/main-page/main-page.html'
	};
} // mainPage

module.exports = mainPage;
