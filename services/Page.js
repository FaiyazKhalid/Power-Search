'use strict';

function Page($http, utils, Params) {

    var page = this;
	page.params = Params;
	page.page = null;


    /*** METHODS ***/

    page.open = function() {
        page.clearResults();
		var paramUrl = createParamUrl(Params.getPageParams());
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				page.page = null;
				if (!data.query) return;
				page.page = data.query.pages[0];
				findImage(page.page);
			})
			.error(handleErrors);
	}; // open

    page.clearResults = function(){
        page.page = null;
    };


    /*** HELPERS ***/

    // duplira se
    function findImage(thisPage) {
		if(thisPage.pageimage) {
            //if (thisPage.thumbnail)
            var imgSrc = thisPage.thumbnail.source;
			var imageName = thisPage.pageimage;
			var commonsUrl = "https://upload.wikimedia.org/wikipedia/commons/";

			if (utils.startsWith(imgSrc, commonsUrl)) {
				thisPage.image = "https://commons.wikimedia.org/wiki/File:" + imageName;
			} else {
				thisPage.image = "https://" + page.params.settings.lang + "." + page.params.settings.domain + ".org/wiki/File:" + imageName;
			}
		}
	} // findImage


    function createParamUrl(params) {
		var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
		return paramUrl;
	} // createParamUrl


    function handleErrors(data, status) {
        if(status == 404) {
            page.error = "The wiki domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		page.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors



} // Page


module.exports = Page;
