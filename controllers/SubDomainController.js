/**
 * Created by gurusrikar on 8/4/16.
 */
var subDomain = require('express-subdomain');
var movieApiEndPoint = require('../routes/movieApiEndPoint');
var express = require('express');
var router = express.Router();

//api specific routes
router.get('/', function (req, res) {
    res.send('Welcome to our API!');
});

router.get('/users', function (req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

var addNewSubDomain = function (myApp, subDomainName, callback) {
    console.log('adding subdomain: ' + subDomainName);
    myApp.use(subDomain(subDomainName, router));
    callback();
//    myApp._router.stack.splice(2, 0, app.stack.splice(app.stack.length-1, 1)[0]);
};

module.exports = {
    addNewSubDomain: addNewSubDomain
};