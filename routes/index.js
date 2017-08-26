var express = require('express');
var router = express.Router();

var viewEndPoint = require('./viewEndPoint');
var movieApiEndPoint = require('./movieApiEndPoint');
var mediaApiEndPoint = require('./mediaApiEndPoint');
var musicApiEndPoint = require('./musicApiEndPoint');
var newsApiEndPoint = require('./newsApiEndPoint');
var reviewApiEndPoint = require('./reviewApiEndPoint');
var userApiEndPoint = require('./userApiEndPoint');

//api with sub-Domain routes
router.use('/movie/:subPermalink/api/user', userApiEndPoint);
router.use('/movie/:subPermalink/api/movie', movieApiEndPoint);
router.use('/movie/:subPermalink/api/media', mediaApiEndPoint);
router.use('/movie/:subPermalink/api/music', musicApiEndPoint);
router.use('/movie/:subPermalink/api/news', newsApiEndPoint);
router.use('/movie/:subPermalink/api/review', reviewApiEndPoint);

//api without sub-Domain routes
router.use('/api/user', userApiEndPoint);
router.use('/api/movie', movieApiEndPoint);
router.use('/api/media', mediaApiEndPoint);
router.use('/api/music', musicApiEndPoint);
router.use('/api/news', newsApiEndPoint);
router.use('/api/review', reviewApiEndPoint);

//view with Subdomain routes
router.use('/movie/', viewEndPoint);

/* GET home page. */
//router.get('/*', function (req, res, next) {
//    console.log(req.hostname);
//    res.sendFile('index.html', {root: __dirname + './../views/'});
//});
router.use('/*', viewEndPoint);

module.exports = router;
