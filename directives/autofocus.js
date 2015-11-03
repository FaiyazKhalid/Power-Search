(function () {
	'use strict';
	angular
		.module("wikiModul")
		.directive('autofocus', ['$timeout', autofocus]);


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

})();
