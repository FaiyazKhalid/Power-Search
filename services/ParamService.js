(function () {
	'use strict';
	angular
		.module("wikiModul")
		.service('ParamService', ParamService);

	function ParamService() {

        var defaultParams = {

        };

        var searchParams = {

        };

        var articleParams = {

        };



        function getDefaultParams() {
            return getDefaultParams;
        }

        function getSearchParams() {
            return getSearchParams;
        }

        function getArticleParams(){

        }


		return {
            getDefaultParams: getDefaultParams,
            getSearchParams: getSearchParams,
            getArticleParams: getArticleParams
		};

	}  // ParamService

})();
