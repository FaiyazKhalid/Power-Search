(function () {

	'use strict';
	angular
		.module("wikiModul")
		.service('LanguageService', LanguageService);


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

					angular.forEach(data.query.interwikimap, function(map) {
	                    if (map.language) {
							languages.all.push(map);
						}
					});

				});
		}; // search


		function filterResults() {

		}


	} // LanguageService

})();
