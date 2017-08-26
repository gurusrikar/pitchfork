/**
 * Created by gurusrikar on 2/4/16.
 */
var mongoose = require('mongoose');
var Movie = require('../models/Movie');
var Music = require('../models/MusicAlbum');

var Responses = {
    MOVIE_NOT_FOUND: {errorMessage: "permalink does not exist"},
    SUCCESS: {success: true}
};

var createMusicAlbum = function (req, res, next) {
    var moviePermalink = req.params.moviePermalink;
    Movie.findByPermalink(moviePermalink, function (err, movieObject) {
        if (err || movieObject === undefined) {
            res.json(Responses.MOVIE_NOT_FOUND);
        }
        var musicAlbum = new Music(req.query);
        musicAlbum.moviePermalink = movieObject.permalink;
        musicAlbum.albumName = movieObject.name;
        musicAlbum.saveNewMusicAlbum(function (err, newMusicAlbum) {
            if(err) {
                console.log(err);
                res.json(err);
            }
            movieObject.musicAlbum = newMusicAlbum._id;
            movieObject.updateMovie(function (err, m) {
                res.json(m);
            });
        });
    });
};

module.exports = {
    createMusicAlbum: createMusicAlbum
};