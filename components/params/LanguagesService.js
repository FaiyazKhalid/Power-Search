'use strict';

// trenutno ucitava sve postojece jezike
// proveriti na kom se domenu nalazimo
// prikazati samo jezike za taj domen (site)
// https://en.wikipedia.org/w/api.php?action=sitematrix&smtype=language&format=json&formatversion=2&callback=JSON_CALLBACK
// http://stackoverflow.com/questions/33608751/retrieve-a-list-of-all-wikipedia-languages-programmatically

function LanguagesService($http, ParamService, utils) {

    var self = this;
	self.all = [];

    var langParams = {
        action: 'sitematrix',
        smtype: 'language',
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };


    /*** HTTP ***/

	self.get = function() {
        self.resetErrors();
        var paramUrl = ParamService.getApiUrl() + '?' + utils.serialize(langParams);
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
        angular.forEach(data.sitematrix, function(map) {
            self.all.push(map);
        });
	}	// filterResults


} // LanguagesService


module.exports = LanguagesService;
