'use strict';

function Page($http, utils, Params) {

    var page = this;
	page.params = Params;
	page.result = null;


    /*** METHODS ***/

    page.open = function() {
		var paramUrl = Params.createParamUrl(Params.getPageParams());
        //console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				page.result = null;
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

    // dupliraju se funkcije!

    function findImage(thisPage) {
        if(!thisPage.pageimage) return;
        var imageSource = thisPage.thumbnail.source;
		var imageName = thisPage.pageimage;
		var commonsUrl = "https://upload.wikimedia.org/wikipedia/commons/";
		if (utils.startsWith(imageSource, commonsUrl)) {
			thisPage.image = "https://commons.wikimedia.org/main/File:" + imageName;
		} else {
			thisPage.image = "https://" + Params.getLang() + "." + Params.getDomain() + ".org/main/File:" + imageName;
		}
	} // findImage


    function handleErrors(data, status) {
        if(status == 404) {
            page.error = "The main domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		page.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors



} // Page


module.exports = Page;
