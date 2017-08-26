/**
 * Created by gurusrikar on 5/4/16.
 */
var mongoose = require('mongoose');
var Movie = require('../models/Movie');
var MovieReview = require('../models/MovieReview');
var MusicReview = require('../models/MusicReview');

var Responses = {
    MOVIE_NOT_FOUND: "permalink does not exist",
    SUCCESS: {success: true}
};

var initiateMovieReviews = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err || movieObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        var movieReviewObject = new MovieReview(req.query);
        movieReviewObject.moviePermalink = moviePermalink;
        movieReviewObject.createMovieReview(function (err, newMovieReviewObject) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            movieObject.movieReview = newMovieReviewObject._id;
            movieObject.updateMovie(function (err, m) {
                res.json(m);
            });
        });
    });
};

var addUserReview = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    MovieReview.addUserReview(moviePermalink, req.query, function (err, reviewObject) {
        if (err || reviewObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    })
};

var addCriticReview = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    MovieReview.addCriticReview(moviePermalink, req.query, function (err, reviewObject) {
        if (err || reviewObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    })
};

var initiateMusicReviews = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err || movieObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        var musicReviewObject = new MusicReview(req.query);
        musicReviewObject.moviePermalink = moviePermalink;
        musicReviewObject.createMusicReview(function (err, newMovieReviewObject) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            movieObject.musicReview = newMovieReviewObject._id;
            movieObject.updateMovie(function (err, m) {
                res.json(m);
            });
        });
    });
};

var addUserReviewMusic = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    MusicReview.addUserReview(moviePermalink, req.query, function (err, reviewObject) {
        if (err || reviewObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    })
};

var addCriticReviewMusic = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    MusicReview.addCriticReview(moviePermalink, req.query, function (err, reviewObject) {
        if (err || reviewObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    })
};

module.exports = {
    initiateMovieReviews: initiateMovieReviews,
    addUserReview: addUserReview,
    addCriticReview: addCriticReview,
    initiateMusicReviews: initiateMusicReviews,
    addUserReviewMusic: addUserReviewMusic,
    addCriticReviewMusic: addCriticReviewMusic
};