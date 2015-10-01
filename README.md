
# NOTE

For more complete framework, maybe you want to use [Krakenjs](http://krakenjs.com/). It has more features (security, build process). Or you can contribute here to add some missing parts.

# Nodejs web app

A [https://nodejs.org/](https://nodejs.org/) web app base template

* [Express 4.x](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Swig](http://paularmstrong.github.io/swig/). Its not maintained now, [see here](https://github.com/paularmstrong/swig/issues/628)

# How to use

* Fork or/and clone
* `$ npm install`
* `$ bower install`
* `$ npm start` or `$ ./start`

# Optional modules

### Winston

[Winston](https://github.com/winstonjs/winston) is multi transport async logging. With it, we can connect to various logging back end. 

To use it, install by

```
npm install winston --save
``` 

Then uncomment following line in `app.js` (it's located at top)

```
require('./tools/logger');
```

### Memwatch

[Memwatch](https://github.com/marcominetti/node-memwatch) is a module that can be used to find potential memory leak by checking heap allocation. See [here](http://blogs.infinitesquares.net/finding-node-js-memory-leak/) for more explanation.

To use it, install by

```
npm install memwatch-next --save
``` 

Then uncomment following line in `app.js` (it's located at top)

```
require('./tools/memwatch');
```

# Some exploration on Nodejs

* Location data provider using MongoDB Geospatial

# TODO

* Security
* Build tools (grunt or gulp)
* Change swig
* Tests and more tests

## Contributions

Contributions are welcome
