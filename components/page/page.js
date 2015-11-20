'use strict';

function page() {
	return {
		controller: 'PageController',
		controllerAs: 'pageControl',
		bindToController: {
			open: '='
		},
		templateUrl: 'components/page/page.html'
	};
} // page

module.exports = page;
