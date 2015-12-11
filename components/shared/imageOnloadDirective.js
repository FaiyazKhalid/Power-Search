'use strict';

/*
usage: <img ng-src="src" image-onload="imgLoadedCallback()" />
https://gist.github.com/kmaida/17eb24221d46152384ef
http://stackoverflow.com/questions/17547917/angularjs-image-onload-event
*/

function imageOnload() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                // call the function that was passed
                scope.$apply(attrs.imageOnload);
            });
        }
    };
}

module.exports = imageOnload;
