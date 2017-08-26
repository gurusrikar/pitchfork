/**
 * Created by gurusrikar on 13/4/16.
 */
var mongoose = require('mongoose');
var User = require('../models/User');
var passport = require('passport');

var Responses = {
    USER_NOT_FOUND: {errorMessage: "Username does not exist"},
    USERNAME_EXISTS: {errorMessage: "Username is taken"},
    INVALID_CREDENTIALS: {errorMessage: "Invalid Username or password"},
    INTERNAL_ERROR: {errorMessage: "Internal Server Error"},
    SUCCESS: {success: true}
};

var passportStrategies = {
    LOCAL: 'local',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter'
};

var signUp = function (req, res, next) {
    var newLocalUser = new User(req.body);
    newLocalUser.password = newLocalUser.generateHash(req.query.password);
    newLocalUser.createNewUser(function (err, newUser) {
        if (err || newUser.errors !== undefined) {
            console.log(err);
            return res.json(Responses.USERNAME_EXISTS);
        }
        req.login(newUser, function (err) {
            if (err) {
                console.log(err);
                return res.json(Responses.INTERNAL_ERROR);
            }
            newUser.password = '';
            return res.json(newUser);
        });
    });
};

//TODO
var signUpGoogle = function (req, res, next) {
    var newLocalUser = new User(req.body);
    newLocalUser.createNewUser(function (err, newUser) {
        newUser.password = '';
        res.json(newUser);
    });
};

var signUpFacebook = function (req, res, next) {
    var newLocalUser = new User(req.body);
    newLocalUser.createNewUser(function (err, newUser) {
        newUser.password = '';
        res.json(newUser);
    });
};

var signUpTwitter = function (req, res, next) {
    var newLocalUser = new User(req.body);
    newLocalUser.createNewUser(function (err, newUser) {
        newUser.password = '';
        res.json(newUser);
    });
};

var signIn = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.json(Responses.INTERNAL_ERROR);
        } else if (!user) {
            return res.json(Responses.INVALID_CREDENTIALS);
        }
        req.login(user, function (err) {
            if (err) {
                console.log(err);
                return res.json(Responses.INTERNAL_ERROR);
            }
            user.password = '';
            return res.json(user);
        });
    })(req, res, next);
};

var logout = function (req, res, next) {
    req.logout();
    res.json(Responses.SUCCESS);
};

module.exports = {
    signUp: signUp,
    signUpGoogle: signUpGoogle,
    signUpFacebook: signUpFacebook,
    signUpTwitter: signUpTwitter,
    signIn: signIn,
    logout: logout
};