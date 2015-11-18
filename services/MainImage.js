'use strict';

function MainImage($http, utils, Params) {

    var mainImage = this;
	mainImage.result = null;

    /*** HTTP ***/
    mainImage.open = function () {
        var paramUrl = Params.getApiUrl() + '?' + utils.serialize(Params.getImagePageParams());
        //console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                if (data.query.pages[0].missing) return;
                mainImage.result = data.query.pages[0];
            });
    };


    mainImage.clearResults =  function () {
        mainImage.result = "";
    };

} // MainImage


module.exports = MainImage;
