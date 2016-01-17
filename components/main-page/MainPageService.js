'use strict';

function MainPageService($http, utils, ParamService) {

    var service = this;
	service.params = ParamService;
	service.result = null;


    /*** METHODS ***/

    service.open = function() {
        service.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPageParams());
        //console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				service.clearResults();
				if (!data.query) return;
				service.result = data.query.pages[0];
				findImage(service.result);
			})
			.error(handleErrors);
	}; // open

    service.clearResults = function(){
        service.result = null;
    };

    service.isExist = function () {
        return service.result !== null;
    };  // isExist

    service.getTitle = function () {
        if(service.result) return service.result.title;
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
            service.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		service.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // MainPageService


module.exports = MainPageService;
