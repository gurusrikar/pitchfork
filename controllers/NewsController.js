/**
 * Created by gurusrikar on 4/4/16.
 */
var mongoose = require('mongoose');
var Movie = require('../models/Movie');
var News = require('../models/News');
var GoogleNewsModule = require('google-news');
var googleNews = new GoogleNewsModule();

var Responses = {
    MOVIE_NOT_FOUND: "permalink does not exist",
    SUCCESS: {success: true}
};

var createNewsLibrary = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err || movieObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        var newsObject = new News(req.query);
        newsObject.moviePermalink = moviePermalink;
        newsObject.saveNews(function (err, newsLibrary) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            movieObject.newsObject = newsLibrary._id;
            movieObject.updateMovie(function (err, m) {
                res.json(m);
            });
        });
    });
};

var getNewsLibrary = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    console.log(moviePermalink);
    News.findByMoviePermalink(moviePermalink, function (err, newsObject) {
        if (err || newsObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(newsObject);
    });
};

var addFeedSources = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    //Turning it into an array so that single values are also handled smoothly
    var dataSource = [];
    dataSource.push(req.query.sourceUrls);
    News.addFeedSources(moviePermalink, dataSource, function (err, newsObject) {
        if (err || newsObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addContact = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    console.log(req.query);
    //Turning it into an array so that single values are also handled smoothly
    var dataSource = [];
    dataSource.push(req.query);
    News.addContact(moviePermalink, dataSource, function (err, newsObject) {
        if (err || newsObject === undefined) {
            console.log(err);
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        } else {
            res.json(Responses.SUCCESS);
        }
    });
};

var getMovieNewsFromGoogle = function(req, res, next) {
    var movieName = req.params.movieName;
    googleNews.stream(movieName, function (stream) {
        stream.on(GoogleNewsModule.DATA, function (data) {
            console.log(data);
            console.log("Response");
//            res.json(data);
        });

        stream.on(GoogleNewsModule.ERROR, function (error) {
            console.log(error);
            console.log("Error");
//            res.json(error);
        });
        res.json({karan: "arjun"});
    })
};

module.exports = {
    createNewsLibrary: createNewsLibrary,
    getNewsLibrary: getNewsLibrary,
    addFeedSources: addFeedSources,
    addContact: addContact,
    getMovieNewsFromGoogle: getMovieNewsFromGoogle
};