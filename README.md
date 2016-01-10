# [Power Wiki Search](http://mudroljub.github.io/power-wiki-search/)
AngularJS module for consuming Wikipedia API.

See it in action: [mudroljub.github.io/power-wiki-search](http://mudroljub.github.io/power-wiki-search/)

## Install

```sh
git clone https://github.com/mudroljub/angular-main-module.git
bower install
nmp install
```

Then open index.html on localhost.

## Documentation
(be aware that this project is under active development, and the code is constantly evolving)

The main `MainController` consists of two main public methods:
- `main.openArticle(title)`
- `main.searchWikipedia(term)`

Those methods getting data from [Wikipedia API](http://en.wikipedia.org/w/api.php) in JSONP format (see [API documentation](https://www.mediawiki.org/main/API:Main_page)).

Both methods have those common URL params:
```js
var params = {
    action: 'query',
    prop: 'extracts|pageimages',    // get article's content and images
    format: 'json',
    formatversion: 2,  // support utf-8
    callback: 'JSON_CALLBACK'
}
```

Specific params for `openArticle` method are:

```js
{
    titles: title,   // title is a variable
    redirects: ''  // auto-redirecting to an article
}
```

Specific params for `searchWikipedia` method are:

```js
{
    generator: 'search',
    gsrsearch: term,  // term is a variable
    pilimit: 'max', // enable images for all results
    exlimit: 'max', // enable content for all results
    exintro: ''    // get only article's intro
}
```

## Development

While developing, use task runner to watch and compile your files:

```
npm run watch
```

## To-do list
- page speed optimization
- fix load more button (return duplicates)
- error handling
- filter files from commons (to get only images)
- remove ng-controller from html

## Licence
MIT
