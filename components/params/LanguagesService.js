'use strict';

// TODO: dinamicaly populate list with available languages
// https://phabricator.wikimedia.org/diffusion/MW/browse/master/languages/Names.php

function LanguagesService($http, ParamsService, utils) {

    var languages = this;
	languages.all = [];

    var params = {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'interwikimap',
        sifilteriw: 'local',
        format: 'json',
        formatversion: 2,
        callback: 'JSON_CALLBACK'
    };


    /*** HTTP ***/

	languages.get = function() {
        var paramUrl = ParamsService.getApiUrl() + '?' + utils.serialize(params);
        //console.log(paramUrl);
		$http.jsonp(paramUrl)
			.success(function (data) {
                languages.all = [];
                filterResults(data);
			})
            .error(function(){
                languages.error = "The language you requesting does not exist for this domain.";
                ParamsService.setLanguage('en');
            });
	}; // search


	function filterResults(data) {
        angular.forEach(data.query.interwikimap, function(map) {
            if (map.language) {
                languages.all.push(map);
            }
        });
	}	// filterResults


} // LanguagesService


module.exports = LanguagesService;
