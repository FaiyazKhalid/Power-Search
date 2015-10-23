(function() {

    // veliku sliku za glavni clanak
    // ubaciti ostale wiki projekte
    // ubaciti paramUrl u dokumentaciju

/*
    za naziv slike vraca url:
    https://en.wikipedia.org/w/api.php?action=query&titles=File:Albert%20Einstein%20Head.jpg&prop=imageinfo&iiprop=url
    mozemo dodati i zeljenu sirinu: &iiurlwidth=220

    vraca nadjene slike za trazeni termin:
    https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&format=json&ailimit=10&aifrom=Albert

    alternativni commonsapi:
    https://tools.wmflabs.org/magnus-toolserver/commonsapi.php
    vraca info o slici i url:
    https://tools.wmflabs.org/magnus-toolserver/commonsapi.php?image=Albert_Einstein_Head.jpg
*/

    'use strict';
    angular
        .module("wikiModul", ['ngSanitize'])
        .controller('WikiController', WikiController)
        .directive('autofocus', ['$timeout', autofocus]);

    function WikiController($http, $window) {

        var wiki = this;
        wiki.term = 'zen'; // default
        wiki.searchFilter = "intitle:";
        wiki.apiUrl = 'http://en.wikipedia.org/w/api.php';
        wiki.page = null;
        wiki.results = null;
        wiki.error = "";
        wiki.leadLarge = false;

        // defaul params for both open and search
        var commonParams = {
            action: 'query',
            prop: 'extracts|pageimages|images',
            redirects: '', // automatically resolve redirects
            format: 'json',
            formatversion: 2,
            callback: 'JSON_CALLBACK'
        };

        // params only for search
        wiki.params = {
            generator: 'search',
            gsrsearch: wiki.term + wiki.searchFilter,
            gsrlimit: 10, // broj rezultata, max 50
            pilimit: 'max', // thumb image for all articles
            exlimit: 'max', // extract for all articles
            imlimit: 'max', // images in articles
            exintro: '' // extracts intro
        };


        /*** PUBLIC METHODS ***/

        wiki.openArticle = function(title) {
            if (wiki.page && (wiki.page.title == title)) {
                wiki.results = removeDupes(title, wiki.results);
                return;
            }
            var paramUrl = createParamUrl({
                titles: title
            }, commonParams);
            $http.jsonp(paramUrl)
                .success(function(data) {
                    if (!data.query) return;
                    var page = data.query.pages[0];
                    wiki.page = page;
                    wiki.results = removeDupes(title, wiki.results, data.query.redirects);
                })
                .error(handleErrors);
        }; // openArticle


        wiki.searchWikipedia = function(term, params) {
            params.gsrsearch = wiki.searchFilter + term;
            var paramUrl = createParamUrl(params, commonParams);

            $http.jsonp(paramUrl)
                .success(function(data) {
                    if (!data.query) {
                        wiki.emptyResults();
                        return false;
                    }
                    wiki.results = data.query.pages;
                    wiki.openArticle(term);
                })
                .error(handleErrors);
        }; // searchWikipedia


        wiki.searchForThisTerm = function(title) {
            if (wiki.leadLarge) {
                wiki.term = title;
                wiki.searchWikipedia(title, wiki.params);
            }
            wiki.toggleLeadLarge();
        }; // searchForThisTerm


        wiki.updateSearchTerm = function() {
            wiki.params.gsrsearch = wiki.searchFilter + wiki.term;
        }; // updateSearchTerm


        wiki.toggleLeadLarge = function() {
            wiki.leadLarge = !wiki.leadLarge;
        }; // toggleLeadLarge


        wiki.openLarge = function(title) {
            wiki.page = '';
            wiki.openArticle(title);
            wiki.leadLarge = true;
        }; // openLarge


        wiki.selectText = function() {
            var text = $window.getSelection().toString();
            wiki.term = text;
        }; // toggleLeadLarge


        wiki.leadPlaceholder = function() {
            return wiki.leadLarge ? "Search for this term" : "Englarge this article";
        };


        wiki.emptyResults = function() {
            wiki.results = [];
            wiki.page = "";
        }; // emptyResults


        wiki.checkMax = function() {
            if (wiki.params.gsrlimit > 50) wiki.params.gsrlimit = 50;
        }; // checkMax


        /*** PRIVATE HELPER FUNCTIONS ***/

        function removeDupes(term, results, redirects) {
            for (var x in results) {
                if (results[x].title == capitalizeFirst(term)) {
                    results.splice(x, 1); // remove it from the list
                }
                if (!redirects) return results;
                for (var r in redirects) {
                    if (redirects[r].to == results[x].title) {
                        results.splice(x, 1);
                    }
                }
            } // end for
            return results;
        } // removeDupes

        function handleErrors() {
            wiki.error = "Oh no, there was some error in geting data.";
        } // handleErrors

        function createParamUrl(params, commonParams) {
            angular.extend(params, commonParams);
            var paramUrl = wiki.apiUrl + '?' + serialize(params);
            console.log(paramUrl);
            return paramUrl;
        } // createParamUrl

        function serialize(params) {
            var paramString = Object.keys(params).map(function(key) {
                return key + '=' + encodeURIComponent(params[key]);
            }).join('&');
            return (paramString);
        } // serialize

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } // capitalizeFirst

    } // WikiController


    function autofocus($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                });
            }
        };
    }   // autofocus

})();
