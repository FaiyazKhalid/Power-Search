'use strict';

function MainImageService($http, utils, ParamsService) {

    var mainImage = this;
	mainImage.result = null;

    /*** HTTP ***/
    mainImage.open = function () {
        var paramUrl = ParamsService.getApiUrl() + '?' + utils.serialize(ParamsService.getImagePageParams());
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

} // MainImageService


module.exports = MainImageService;
