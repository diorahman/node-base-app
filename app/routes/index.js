

module.exports = function() {

  // Before routes
  app.use(function(req, res, next) {

    req.locale = req.session.locale || config.i18n.defaultLocale;

    // set base model
    res.baseModel = {
      user: req.user,
      locale: req.locale,
      version: version
    }

    // set accept
    var accept = req.get('Accept') || '';
    req.explicitlyAcceptsHTML = (accept.indexOf('html') !== -1);
    req.wantsJSON = req.xhr;
    req.wantsJSON = req.wantsJSON || !req.explicitlyAcceptsHTML;

    // send ok
    res.ok = function(data, message, status) {
      res.send({
        meta: {
          status: 'OK',
          code: status || 200,
          message: message,
        },
        data: data
      })
    }

    next();
  });

  // routes
  app.use('/', require('./web'));
  app.use('/api', require('./api'))
  app.use('/api/location', require('./location'))
  app.use('/test', require('./test'));

  // 404 handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  var commonErrorMessage = {
    '400': 'Bad Request',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Error'
  }

  // error handler
  app.use(function(err, req, res, next) {

    if (err) {

      var errSplitted = err.stack.split('\n');
      console.error({
        message: errSplitted[0],
        location: errSplitted[1].trim(),
        url: req.originalUrl
      });

      var status = err.status || 500;
      res.status(status);

      var meta = {
        status: 'Error',
        code: status,
        message: err.message || commonErrorMessage['' + status]
      }

      if (err.message === 'Invalid login data') {
        req.logout();
        return res.redirect('/signin');
      }

      if (req.wantsJSON) {
        return res.send({
          meta: meta,
          data: err.data
        });
      }
      else {
        var model = {
          meta: meta,
          data: err.data,
          locale: req.locale,
          user: req.user
        }
        return res.render('errors/error', model);
      }

    }

  });

}