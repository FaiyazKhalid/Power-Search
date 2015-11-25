'use strict';

function PageService($http, utils, ParamService) {

    var page = this;
	page.params = ParamService;
	page.result = null;


    /*** METHODS ***/

    page.open = function() {
        page.clearResults();
        if(!ParamService.getSearchTerm()) return;
		var paramUrl = ParamService.createParamUrl(ParamService.getPageParams());
        //console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				page.clearResults();
				if (!data.query) return;
				page.result = data.query.pages[0];
				findImage(page.result);
			})
			.error(handleErrors);
	}; // open

    page.clearResults = function(){
        page.result = null;
    };

    page.isExist = function () {
        return page.result !== null;
    };  // isExist

    page.getTitle = function () {
        if(page.result) return page.result.title;
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
            page.error = "The domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		page.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors


} // PageService


module.exports = PageService;
