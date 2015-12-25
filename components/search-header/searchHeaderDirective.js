'use strict';

function searchHeader() {
	return {
		controller: 'SearchHeaderController',
		controllerAs: 'ctrl',
		bindToController: {
			search: '='
		},
		templateUrl: 'components/search-header/search-header.html'
	};
} // searchHeader

module.exports = searchHeader;
