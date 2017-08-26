/**
 * Created by gurusrikar on 2/4/16.
 */

var express = require('express');
var router = express.Router();
var musicController = require('../controllers/MusicController');

/* GET users listing. */
router.post('/:moviePermalink/create-musicAlbum', function(req, res, next) {
    musicController.createMusicAlbum(req, res, next);
});

router.get('/:moviePermalink', function(req, res, next) {
    console.log("Fetching media object for movie");
    musicController.getMusicAlbum(req, res, next);
});

//router.post('/:moviePermalink/addTrack', function(req, res, next) {
//    musicController.addATrack(req, res, next);
//});

router.get('/', function (req, res, next) {
    musicController.getMusicAlbumById(req, res, next);
});

module.exports = router;
