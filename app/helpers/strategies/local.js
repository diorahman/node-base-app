
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    (username, password, done) => {
        User.findOne({email: username}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { type: 'email', message: 'The email you entered does not belong to any account.' });
            }

            if (!user.passwordMatches(password)) {
                return done(null, false, { type: 'password', message: 'The password you entered is incorrect. Please enter again.', email: username });
            }

            return done(null, user);
        });
    })

);
