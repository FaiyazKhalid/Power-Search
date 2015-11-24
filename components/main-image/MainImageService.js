'use strict';

function MainImageService($http, utils, ParamService) {

    var mainImage = this;
	mainImage.result = null;

    /*** HTTP ***/
    mainImage.open = function () {
        var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImagePageParams());
        //console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                if (data.query.pages[0].missing) return;
                mainImage.result = data.query.pages[0];
            });
    };


    mainImage.clearResults =  function () {
        mainImage.result = null;
    };

} // MainImageService


module.exports = MainImageService;
