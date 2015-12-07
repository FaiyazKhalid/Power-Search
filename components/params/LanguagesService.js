'use strict';

// samo jednom treba da ucita sve (mozda na init)
// proveriti na kom se domenu nalazimo
// prikazati samo jezike za taj domen (site)

function LanguagesService($http, ParamService) {

    var self = this;
	self.all = [];


    /*** METHODS ***/

	self.get = function() {
        self.resetErrors();
        var paramUrl = "https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK";
        console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                self.all = [];
                filterResults(data);
			})
            .error(function(){
                self.error = "The language you requesting does not exist for this domain.";
                ParamService.setLanguage('en');
            });
	}; // search


    self.resetErrors = function () {
        self.error = null;
    };


    /*** HELPERS ***/

	function filterResults(data) {
        var domain = ParamService.getDomain();
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
