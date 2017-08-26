var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

var mediaLibrarySchema = new mongoose.Schema({
    moviePermalink: {type: String, unique: true },
    trailers: [String],
    titlePoster: String,
    images: [String],
    videos: [String],
    otherSources: [String],
    fbPage: String,
    twitterPage: String,
    youtubeChannel: String
}, schemaOptions);

mediaLibrarySchema.plugin(uniqueValidator);

var addElementsToSet = function (moviePermalink, fieldName, fieldValuesArray, callback) {
    var query = {moviePermalink: moviePermalink};
    var update = {$addToSet: {}};
    update['$addToSet'][fieldName] = {};
    update['$addToSet'][fieldName]['$each'] = fieldValuesArray; //{$addToSet: {images: {$each: fieldValuesArray}}};
    var options = {upsert: true};
    return this.findOneAndUpdate(query, update, options)
        .exec(callback);
};

var setValueToField = function (moviePermalink, fieldName, fieldValue, callback) {
    var query = {moviePermalink: moviePermalink};
    var update = {$set: {}};
    update['$set'][fieldName] = fieldValue; //{$set: {fbPage: fbPage}};
    var options = undefined;
    return this.findOneAndUpdate(query, update, options)
        .exec(callback);
};

mediaLibrarySchema.statics = {
    findByMoviePermalink: function (moviePermalink, callback) {
        this.findOne({moviePermalink: moviePermalink}).
            exec(callback);
    },

    findByMediaId: function (mediaId, callback) {
        this.findById(mediaId)
            .exec(callback);
    },

    setTitlePermalink: function (moviePermalink, titlePoster, callback) {
        return setValueToField.call(this, moviePermalink, 'titlePoster', titlePoster, callback);
    },

    addImageUrls: function (moviePermalink, imageUrls, callback) {
        return addElementsToSet.call(this, moviePermalink, 'images', imageUrls, callback);
    },

    addVideoUrls: function (moviePermalink, videoUrls, callback) {
        return addElementsToSet.call(this, moviePermalink, 'videos', videoUrls, callback);
    },

    addOtherSources: function (moviePermalink, otherUrls, callback) {
        return addElementsToSet.call(this, moviePermalink, 'otherSources', otherUrls, callback);
    },

    addFbPage: function (moviePermalink, fbPageUrl, callback) {
        return setValueToField.call(this, moviePermalink, 'fbPage', fbPageUrl, callback);
    },

    addTwitterHandle: function (moviePermalink, twitterPageUrl, callback) {
        return setValueToField.call(this, moviePermalink, 'twitterPage', twitterPageUrl, callback);
    },

    addYoutubeChannel: function (moviePermalink, youtubeChannelUrl, callback) {
        return setValueToField.call(this, moviePermalink, 'youtubeChannel', youtubeChannelUrl, callback);
    }

};

mediaLibrarySchema.methods.saveNewMedia = function (callback) {
    return this.save(callback);
};


module.exports = mongoose.model('mediaLibrary', mediaLibrarySchema);