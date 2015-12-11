'use strict';

function MainImageService($http, utils, ParamService) {

    var service = this;
	service.result = null;


    /*** METHODS ***/

    service.open = function () {
        var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImagePageParams());
        // console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                service.clearResults();
				if (!data.query) return;
                if (data.query.pages[0].missing) return;
                service.result = data.query.pages[0];
                addSpaceInTitle();
            });
    };  // open


    service.clearResults =  function () {
        service.result = null;
    };  // clearResults


    /* HELPERS */

    function addSpaceInTitle() {
        var title = service.result.title;
        var phraseStart = title.indexOf("Category:");
        if(phraseStart >= 0) {
            var phraseEnd = phraseStart + "Category:".length;
            service.result.title = title.slice(phraseStart, phraseEnd) + " " + title.slice(phraseEnd);
        }
    }   // addSpaceInTitle


} // MainImageService


module.exports = MainImageService;
