'use strict';

function LanguagesService($http, ParamService) {

    var self = this;
	self.all = [];


    /*** METHODS ***/

	self.get = function() {
        self.resetErrors();
        if(ParamService.getDomain() === "commons") return;
        var paramUrl = "https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK";
        console.log(paramUrl);

		$http.jsonp(paramUrl)
			.success(function (data) {
                self.all = [];
                filterResults(data);
			});
	}; // search


    self.resetErrors = function () {
        self.error = null;
    };


    /*** HELPERS ***/

	function filterResults(data) {
        var domain = ParamService.getDomain();
        if(domain === "wikipedia") domain = "wiki";
        angular.forEach(data.sitematrix, function(item) {
            if(item.site) {
                for(var i = 0; i < item.site.length; i++) {
                    if(domain === item.site[i].code) self.all.push(item);
                }
            }
        });
	}	// filterResults


} // LanguagesService

module.exports = LanguagesService;
