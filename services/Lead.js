'use strict';

function Lead($http, utils, Params) {

    var lead = this;
	lead.params = Params;
	lead.page = null;


    /*** METHODS ***/

    lead.open = function() {
        lead.clearResults();
		var paramUrl = createParamUrl(Params.getPageParams());
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
				lead.page = null;
				if (!data.query) return;
				lead.page = data.query.pages[0];
				findImage(lead.page);
			})
			.error(handleErrors);
	}; // open

    lead.clearResults = function(){
        lead.page = null;
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
				thisPage.image = "https://" + lead.params.settings.lang + "." + lead.params.settings.domain + ".org/wiki/File:" + imageName;
			}
		}
	} // findImage


    function createParamUrl(params) {
		var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
		return paramUrl;
	} // createParamUrl


    function handleErrors(data, status) {
        if(status == 404) {
            lead.error = "The wiki domain you requesting does not exist. Try again with different criteria.";
            return;
        }
		lead.error = "Oh no, there was some error in geting data: " + status;
	} // handleErrors



} // Lead


module.exports = Lead;
