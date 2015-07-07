

module.exports = function(app) {

  // Before routes
  app.use(function(req, res, next) {

    req.locale = req.session.locale || config.i18n.defaultLocale;

    // set base model
    res.baseModel = {
      user: req.user,
      locale: req.locale
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

      var showStack = res.showStack || !(err.status === 404 || err.message.indexOf('TTL') < 0)

      if (!err.status)
        console.error(err);

      if(err.status) {
        console.error(err.status, commonErrorMessage[''+err.status], req.originalUrl, showStack ? err.stack : '' );
      }

      console.error(err.stack);

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