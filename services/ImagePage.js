'use strict';

function ImagePage($http, utils, Params) {

    var imagepage = this;
	imagepage.result = null;

    /*** HTTP ***/
    imagepage.open = function () {
        var paramUrl = Params.getApiUrl() + '?' + utils.serialize(Params.getImagePageParams());
        console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                if (data.query.pages[0].missing) return;
                imagepage.result = data.query.pages[0];
            });
    };


    imagepage.clearResults =  function () {
        imagepage.result = "";
    };

} // ImagePage


module.exports = ImagePage;
