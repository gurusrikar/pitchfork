/**
 * Created by gurusrikar on 1/4/16.
 */

var mongoose = require('mongoose');
var Movie = require('../models/Movie');
var Media = require('../models/MediaLibrary');

var Responses = {
    MOVIE_NOT_FOUND: "permalink does not exist",
    SUCCESS: {success: true}
};

var createMediaLibrary = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err || movieObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        var mediaObject = new Media(req.query);
        mediaObject.moviePermalink = moviePermalink;
        mediaObject.saveNewMedia(function (err, newMediaLibrary) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            movieObject.mediaObject = newMediaLibrary._id;
            movieObject.updateMovie(function (err, m) {
                res.json(m);
            });
        });
    });
};

var updateMediaLibrary = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Media.findByMoviePermalink(moviePermalink, function (err, mediaObject) {
        for (var prop in req.query) {
            if (!req.query.hasOwnProperty(prop)) continue;
            mediaObject[prop] = req.query[prop];
        }
        mediaObject.saveNewMedia(function (err, updatedMediaLibrary) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            res.json(updatedMediaLibrary);
        });
    });
};

var getMediaLibrary = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    console.log(moviePermalink);
    Media.findByMoviePermalink(moviePermalink, function (err, mediaObject) {
        if (err || mediaObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(mediaObject);
    });
};

var getMediaLibraryById = function (req, res, next) {
    var mediaId = req.query.mediaId;
    Media.findByMediaId(mediaId, function (err, mediaObject) {
        if (err || mediaObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(mediaObject);
    });
};

var setTitlePoster = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Media.setTitlePermalink(moviePermalink, req.query.titlePoster, function (err, mediaObject) {
        if (err || mediaObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    })
};

var addImages = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    //Turning it into an array so that single values are also handled smoothly
    var dataSource = [];
    dataSource.push(req.query.imageUrls);
    Media.addImageUrls(moviePermalink, dataSource, function (err, mediaObject) {
        if (err || mediaObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addVideos = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    //Turning it into an array so that single values are also handled smoothly
    var dataSource = [];
    dataSource.push(req.query.videoUrls);
    Media.addVideoUrls(moviePermalink, dataSource, function (err, mediaObject) {
        if (err || mediaObject === undefined) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addOtherSources = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    console.log(req.query.otherSources);
    //Turning it into an array so that single values are also handled smoothly
    var dataSource = [];
    dataSource.push(req.query.otherSources);
    Media.addOtherSources(moviePermalink, dataSource, function (err) {
        if (err) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addFbPage = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Media.addFbPage(moviePermalink, req.query.fbPage, function (err, mediaObject) {
        if (err) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addTwitterHandle = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Media.addTwitterHandle(moviePermalink, req.query.twitterHandle, function (err, mediaObject) {
        if (err) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

var addYoutubeChannel = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Media.addYoutubeChannel(moviePermalink, req.query.youtubeChannel, function (err, mediaObject) {
        if (err) {
            res.json({errorMessage: Responses.MOVIE_NOT_FOUND});
        }
        res.json(Responses.SUCCESS);
    });
};

module.exports = {
    createMediaLibrary: createMediaLibrary,
    updateMediaLibrary: updateMediaLibrary,
    getMediaLibrary: getMediaLibrary,
    getMediaLibraryById: getMediaLibraryById,
    setTitlePoster: setTitlePoster,
    addImages: addImages,
    addVideos: addVideos,
    addOtherSources: addOtherSources,
    addFbPage: addFbPage,
    addTwitterHandle: addTwitterHandle,
    addYoutubeChannel: addYoutubeChannel
};