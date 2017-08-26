var mongoose = require('mongoose');
var Movie = require('../models/Movie');
var Crew = require('../models/Crew');
var subDomainController = require('./SubDomainController');
var myApp = require('../app');

var errorStrings = {
    MOVIE_NOT_FOUND: "permalink does not exist"
};

var createMovie = function (req, res, next) {
    var movieObject = new Movie(req.query);
    movieObject.saveNewMovie(function (err, newMovie) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        res.json(newMovie);
    });
};

var updateGeneralMovieDetails = function (req, res, next) {
    Movie.findByPermalink(req.params.permalink, function (err, movieObject) {
        if (err || movieObject == undefined) {
            res.json({errorMessage: errorStrings.MOVIE_NOT_FOUND});
        }
        movieObject.name = req.query.name;
        movieObject.caption = req.query.caption;
        movieObject.releaseYear = req.query.releaseYear;
        movieObject.genre = req.query.genre;
        movieObject.updateMovie(function (err, updatedMovieObject) {
            res.json(updatedMovieObject);
        });
    });
};

var addPersonToMovie = function (req, res, next) {
    var moviePermalink = req.params.permalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
//        console.log("Got movie: " + movieObject);
        if (err || movieObject == undefined) {
            res.json({errorMessage: errorStrings.MOVIE_NOT_FOUND});
        }
        movieObject.people = req.query;
        movieObject.updateMovie(function (err, updatedMovieObject) {
            res.json(updatedMovieObject);
        });
    })
};

var getMovie = function (req, res, next) {
    var moviePermalink = req.params.permalink;
    console.log('Getting movie: ' + moviePermalink);
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err) res.json({errorMessage: errorStrings.MOVIE_NOT_FOUND});
        res.json(movieObject);
    });
};

var getAllMovies = function (req, res, next) {
    Movie.getAll(function (err, movies) {
        if (err) res.json({errorMessage: errorStrings.MOVIE_NOT_FOUND});
        res.json(movies);
    });
};

module.exports = {
    createMovie: createMovie,
    updateGeneralMovieDetails: updateGeneralMovieDetails,
    addPersonToMovie: addPersonToMovie,
    getMovie: getMovie,
    getAllMovies: getAllMovies
};