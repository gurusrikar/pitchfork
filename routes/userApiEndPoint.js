/**
 * Created by gurusrikar on 13/4/16.
 */
var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

/* GET users listing. */
router.post('/sign-up', function(req, res, next) {
    userController.signUp(req, res, next);
});


router.post('/sign-up-google', function(req, res, next) {
    userController.signUpGoogle(req, res, next);
});

router.post('/sign-up-fb', function(req, res, next) {
    userController.signUpFacebook(req, res, next);
});

router.post('/sign-up-twitter', function(req, res, next) {
    userController.signUpTwitter(req, res, next);
});

router.post('/sign-in', function(req, res, next) {
    userController.signIn(req, res, next);
});

router.post('/sign-out', function (req, res, next) {
    userController.logout(req, res, next);
});

//router.post('/update-profile', function (req, res, next) {
//    userController.updateProfile(req, res, next);
//});

module.exports = router;