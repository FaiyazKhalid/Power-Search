'use strict';

function page() {
	return {
		controller: 'PageController',
		controllerAs: 'pageControl',
		bindToController: {
			open: '=',
			large: '='
		},
		templateUrl: 'components/main-page/page.html'
	};
} // page

module.exports = page;
