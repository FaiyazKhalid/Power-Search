# Angular Wiki Search
AngularJS module for consuming Wikipedia API.

See it in action: [http://mudroljub.github.io/angular-main-search/](http://mudroljub.github.io/angular-main-search/)

## Install
Just download the directory and open index.html file. You can also do it developer way:

```sh
$ git clone https://github.com/mudroljub/angular-main-module.git
$ bower install
$ open index.html
```

If you don't use [Bower](http://bower.io/), you can manually resolve dependencies from bower.json file.

Enjoy power searching Wikipedia!

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
- error handling
- filter files from commons (get only images)
- maybe remove MainController from main-page.html and params.html

## Licence
MIT
