'use strict';

// TODO: dinamicaly populate list with available languages
// https://phabricator.wikimedia.org/diffusion/MW/browse/master/languages/Names.php

function Languages($http, Params, utils) {

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
                languages.error = "";
                languages.all = [];
                filterResults(data);
			})
            .error(function(){
                console.log("The language you requesting does not exist for this wiki. Try search in different language.");
                Params.setLanguage('en');
            });
	}; // search


	function filterResults(data) {
        angular.forEach(data.query.interwikimap, function(map) {
            if (map.language) {
                languages.all.push(map);
            }
        });
	}	// filterResults


} // Languages


module.exports = Languages;
