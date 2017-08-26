/**
 * Created by gurusrikar on 4/4/16.
 */
var express = require('express');
var router = express.Router();
var newsController = require('../controllers/NewsController');

/* GET users listing. */
router.post('/:moviePermalink/create-news', function(req, res, next) {
    newsController.createNewsLibrary(req, res, next);
});

router.get('/:moviePermalink', function(req, res, next) {
    newsController.getNewsLibrary(req, res, next);
});

router.post('/:moviePermalink/newsFeedSources', function(req, res, next) {
    newsController.addFeedSources(req, res, next);
});

router.post('/:moviePermalink/contact', function(req, res, next) {
    newsController.addContact(req, res, next);
});

router.get('/google/:movieName', function(req, res, next) {
    newsController.getMovieNewsFromGoogle(req, res, next);
});

module.exports = router;
