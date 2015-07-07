
exports.isAuthenticated = function(role) {

  return function (req, res, next) {

    if(!req.session.token){
      return res.render('login');
    }
    
    next();
  };
}
