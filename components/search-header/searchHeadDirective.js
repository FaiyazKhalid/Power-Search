'use strict';

function searchHead() {
	return {
		controller: 'SearchHeadController',
		controllerAs: 'ctrl',
		bindToController: {
			search: '='
		},
		templateUrl: 'components/search-header/search-header.html'
	};
} // searchHead

module.exports = searchHead;
