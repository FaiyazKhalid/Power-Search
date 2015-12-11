'use strict';

function MainPageService($http, utils, ParamService) {

    var self = this;
	self.params = ParamService;
	self.result = null;


    /*** METHODS ***/

    self.open = function() {
        self.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPageParams());
        //console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				self.clearResults();
				if (!data.query) return;
				self.result = data.query.pages[0];
				findImage(self.result);
			})
			.error(handleErrors);
	}; // open

    self.clearResults = function(){
        self.result = null;
    };

    self.isExist = function () {
        return self.result !== null;
    };  // isExist

    self.getTitle = function () {
        if(self.result) return self.result.title;
    };


    /*** HELPERS ***/

    function findImage(thisPage) {
        if(!thisPage.pageimage) return;
        var imgSource = thisPage.thumbnail.source;
		var fileName = thisPage.pageimage;
		if (utils.startsWith(imgSource, "https://upload.wikimedia.org/wikipedia/commons/")) {
			thisPage.image = "https://commons.wikimedia.org/main/File:" + fileName;
		} else {
			thisPage.image = "https://" + ParamService.getLang() + "." + ParamService.getDomain() + ".org/main/File:" + fileName;
		}
	} // findImage


    function handleErrors(data, status) {
        if(status == 404) {
            self.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		self.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // MainPageService


module.exports = MainPageService;
