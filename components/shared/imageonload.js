'use strict';

function imageonload() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.bind('load', function() {
                console.log('image is loaded');
                return true;
            });
        }
    };
}

module.exports = imageonload;
