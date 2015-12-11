'use strict';

function params() {
	return {
		controller: 'ParamsController',
		controllerAs: 'paramsControl',
		bindToController: {
			search: '='
		},
		templateUrl: 'components/params/params.html'
	};
} // params

module.exports = params;
