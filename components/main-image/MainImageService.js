'use strict';

function MainImageService($http, utils, ParamService) {

    var mainImage = this;
	mainImage.result = null;


    /*** METHODS ***/

    mainImage.open = function () {
        var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImagePageParams());
        // console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                mainImage.clearResults();
				if (!data.query) return;
                if (data.query.pages[0].missing) return;
                mainImage.result = data.query.pages[0];
                addSpaceInTitle();
            });
    };  // open


    mainImage.clearResults =  function () {
        mainImage.result = null;
    };  // clearResults


    /* HELPERS */

    function addSpaceInTitle() {
        var title = mainImage.result.title;
        var phraseStart = title.indexOf("Category:");
        if(phraseStart >= 0) {
            var phraseEnd = phraseStart + "Category:".length;
            mainImage.result.title = title.slice(phraseStart, phraseEnd) + " " + title.slice(phraseEnd);
        }
    }   // addSpaceInTitle


} // MainImageService


module.exports = MainImageService;
