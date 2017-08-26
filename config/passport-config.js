/**
 * Created by gurusrikar on 12/4/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("-------");
        console.log(username);
        console.log(password);
        User.findByUsername(username, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByUserId(id, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

module.exports = passport;