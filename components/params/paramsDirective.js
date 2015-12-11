'use strict';

function params() {
	return {
		controller: 'ParamsController',
		controllerAs: 'ctrl',
		bindToController: {
			search: '='
		},
		templateUrl: 'components/params/params.html'
	};
} // params

module.exports = params;
