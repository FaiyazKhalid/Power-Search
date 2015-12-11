'use strict';

function mainPage() {
	return {
		controller: 'PageController',
		controllerAs: 'pageControl',
		bindToController: {
			open: '=',
			large: '='
		},
		templateUrl: 'components/main-page/page.html'
	};
} // mainPage

module.exports = mainPage;
