'use strict';

function autofocus($timeout) {
	return {
		restrict: 'A',
		link: function ($scope, $element) {
			$timeout(function () {
				$element[0].focus();
			});
		}
	};
} // autofocus

module.exports = autofocus;
