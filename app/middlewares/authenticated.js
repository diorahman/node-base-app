
exports.isAuthenticated = function(role) {

  return function (req, res, next) {

    if (!req.isAuthenticated()) {
      req.session.returnTo = req.url;
      res.redirect('/signin');
      return;
    }

    if (role && _.intersection(role, req.user.role).length === 0) {        
      var model = config.page;
      res.status(401);
      res.render('errors/401', model);
      return;
    }
    
    next();
  };
}
