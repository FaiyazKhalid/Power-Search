'use strict';

function MainImageService($http, utils, ParamService) {

    var self = this;
	self.result = null;


    /*** METHODS ***/

    self.open = function () {
        var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(ParamService.getImagePageParams());
        // console.log(paramUrl);
        $http.jsonp(paramUrl)
            .success(function (data) {
                self.clearResults();
				if (!data.query) return;
                if (data.query.pages[0].missing) return;
                self.result = data.query.pages[0];
                addSpaceInTitle();
            });
    };  // open


    self.clearResults =  function () {
        self.result = null;
    };  // clearResults


    /* HELPERS */

    function addSpaceInTitle() {
        var title = self.result.title;
        var phraseStart = title.indexOf("Category:");
        if(phraseStart >= 0) {
            var phraseEnd = phraseStart + "Category:".length;
            self.result.title = title.slice(phraseStart, phraseEnd) + " " + title.slice(phraseEnd);
        }
    }   // addSpaceInTitle


} // MainImageService


module.exports = MainImageService;
