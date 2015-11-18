'use strict';

function imagepage() {
	return {
		controller: 'ImageController',
		controllerAs: 'imagepageControl',
        templateUrl: 'components/imagepage/imagepage.html'
	};
} // imagepage

module.exports = imagepage;
