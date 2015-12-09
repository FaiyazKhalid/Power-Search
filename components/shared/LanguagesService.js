'use strict';

function LanguagesService($http, ParamService) {

    var self = this;
	self.all = [];

    var chosenLang = ParamService.getLang();
    var defaultLang = 'en';

    /*** METHODS ***/

	self.get = function() {
        self.resetErrors();
        if(ParamService.getDomain() === "commons") return;
        var paramUrl = "https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK";
        console.log(paramUrl);

		$http.jsonp(paramUrl)
			.success(function (data) {
                self.all = [];
                filterLanguages(data);
			});
	}; // search


    self.resetErrors = function () {
        self.error = null;
    };


    /*** HELPERS ***/

	function filterLanguages(data) {
        var foundChosenLang = false;
        var domain = ParamService.getDomain();
        if(domain === "wikipedia") domain = "wiki";

        angular.forEach(data.sitematrix, function(item) {
            if(!item.site) return;
            for(var i = 0; i < item.site.length; i++) {
                if(domain === item.site[i].code) {
                    self.all.push(item);
                    if(item.code === chosenLang) foundChosenLang = true;
                }
            }   // end for
        }); // angular.forEach

        if(!foundChosenLang) ParamService.setLanguage(defaultLang);
	}	// filterLanguages


} // LanguagesService

module.exports = LanguagesService;
