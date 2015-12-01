'use strict';

// odvojiti lang controller
// izbaciti LanguagesService.get() iz params controllera

// trenutno ucitava sve postojece jezike
// http://stackoverflow.com/questions/33608751/retrieve-a-list-of-all-wikipedia-languages-programmatically

function LanguagesService($http, ParamService, utils) {

    var self = this;
	self.all = [];

    var langParams = {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'interwikimap',
        sifilteriw: 'local',
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

	function filterResults(data) {
        angular.forEach(data.query.interwikimap, function(map) {
            if (map.language) {
                self.all.push(map);
            }
        });
	}	// filterResults


} // LanguagesService


module.exports = LanguagesService;
