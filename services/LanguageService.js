'use strict';

// TODO: dinamicaly populate list with available languages
// https://phabricator.wikimedia.org/diffusion/MW/browse/master/languages/Names.php

function LanguageService($http, Params, utils) {

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
        var paramUrl = Params.getApiUrl() + '?' + utils.serialize(params);
        console.log(paramUrl);

		$http.jsonp(paramUrl)
			.success(function (data) {
                filterResults(data);

			});
	}; // search


	function filterResults(data) {
        angular.forEach(data.query.interwikimap, function(map) {
            if (map.language) {
                languages.all.push(map);
            }
        });
	}	// filterResults


} // LanguageService


module.exports = LanguageService;
