
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {
                type: 'user',
                message: 'User not exist.',
            });
        }

        if (!user.passwordMatches(password)) {
            return done(null, false, {
                type: 'password',
                message: 'Password mismatch.',
            });
        }

        return done(null, user);
    });
}));
