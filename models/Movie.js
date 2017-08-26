var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
var crewObject = require("./Crew");
var importantDatesSchema = mongoose.Schema({event: String, date: Date}); //ReleaseDate, AudioRelease, Trailer, Teaser
var musicAlbum = require("./MusicAlbum");
var mediaLibrary = require("./MediaLibrary");
var objectId = Schema.Types.ObjectId;

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

//Creating the movie schema
var movieSchema = new mongoose.Schema({
    permalink: { type: String, index: true, unique: true },
    name: { type: String, required: true },
    releaseYear: Number,
    caption: String,
    runLength: Number,
    genre: [String],

    plot: String,
    censorRating: String,

    people: crewObject,

    importantDates: [importantDatesSchema],

    productionCompany: String,
    banner: String,
    musicAlbum: {type: objectId, ref: 'musicAlbum'},
    mediaObject: {type: objectId, ref: 'mediaLibrary'},
    newsObject: {type: objectId, ref: 'newsLibrary'},
    movieReview: {type: objectId, ref: 'movieReview'},
    musicReview: {type: objectId, ref: 'musicReview'},

    titlePoster: String,

    language: String,
    filmType: String,
    colorInfo: String,
    frameRate: String,
    aspectRatio: String,
    archivalSource: String
}, schemaOptions);

movieSchema.plugin(uniqueValidator);

movieSchema.statics = {
    findByPermalink: function (permalink, callback) {
        this.findOne({permalink: permalink})
            .populate('mediaObject')
            .populate('newsObject')
            .exec(callback);
    },

    getAll: function (callback) {
        this.find()
            .populate('mediaObject')
            .populate('newsObject')
            .exec(callback);
    },

    getPeopleObject: function (permalink, callback) {
        this.findOne({permalink: permalink}).
            exec(function (err, movie) {
                if (err) callback(err, undefined);
                callback(undefined, movie.people);
            });
    }
};

movieSchema.methods.saveNewMovie = function (callback) {
    return this.save(callback);
};

movieSchema.methods.updateMovie = function (callback) {
    return this.save(callback);
};

movieSchema.methods.deleteMovie = function (callback) {
    return this.remove(callback);
};


//Creating Movie model
var movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;