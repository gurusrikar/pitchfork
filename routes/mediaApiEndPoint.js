/**
 * Created by gurusrikar on 1/4/16.
 */

var express = require('express');
var router = express.Router();
var mediaController = require('../controllers/MediaController');

/* GET users listing. */
router.post('/:moviePermalink/create-media', function(req, res, next) {
    console.log("Creating a new media object for movie");
    mediaController.createMediaLibrary(req, res, next);
});

router.post('/:moviePermalink/update-media', function(req, res, next) {
    console.log("Creating a new media object for movie");
    mediaController.updateMediaLibrary(req, res, next);
});

router.get('/:moviePermalink', function(req, res, next) {
    console.log("Fetching media object for movie");
    mediaController.getMediaLibrary(req, res, next);
});

router.get('/:moviePermalink/setTitlePoster', function(req, res, next) {
    mediaController.setTitlePoster(req, res, next);
});

router.post('/:moviePermalink/addImages', function(req, res, next) {
    mediaController.addImages(req, res, next);
});

router.post('/:moviePermalink/addVideos', function(req, res, next) {
    mediaController.addVideos(req, res, next);
});

router.post('/:moviePermalink/addOtherSources', function(req, res, next) {
    mediaController.addOtherSources(req, res, next);
});

router.post('/:moviePermalink/addFbPage', function(req, res, next) {
    mediaController.addFbPage(req, res, next);
});

router.post('/:moviePermalink/addTwitterHandle', function(req, res, next) {
    mediaController.addTwitterHandle(req, res, next);
});

router.post('/:moviePermalink/addYoutubeChannel', function(req, res, next) {
    mediaController.addYoutubeChannel(req, res, next);
});

router.get('/', function (req, res, next) {
    mediaController.getMediaLibraryById(req, res, next);
});

module.exports = router;
