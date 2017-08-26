/**
 * Created by gurusrikar on 5/4/16.
 */
var express = require('express');
var router = express.Router();
var reviewController = require('../controllers/ReviewController');

/* GET users listing. */
router.post('/:moviePermalink/initiate-movie-reviews', function(req, res, next) {
    reviewController.initiateMovieReviews(req, res, next);
});

router.post('/:moviePermalink/user-rating', function (req, res, next) {
    reviewController.addUserReview(req, res, next);
});

router.post('/:moviePermalink/critic-rating', function (req, res, next) {
    reviewController.addCriticReview(req, res, next);
});

router.post('/:moviePermalink/initiate-music-reviews', function (req, res, next) {
    reviewController.initiateMusicReviews(req, res, next);
});

router.post('/:moviePermalink/music/user-rating', function (req, res, next) {
    reviewController.addUserReviewMusic(req, res, next);
});

router.post('/:moviePermalink/music/critic-rating', function (req, res, next) {
    reviewController.addCriticReviewMusic(req, res, next);
});

module.exports = router;