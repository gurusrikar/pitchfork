/**
 * Created by gurusrikar on 4/4/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

var contactSchema = mongoose.Schema({name: String, email: String, phone: String, contactFor: String});
var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

var newsLibrarySchema = new mongoose.Schema({
    moviePermalink: {type: String, unique: true},
    feed: [String],
    sticky: [String],
    contacts: [contactSchema]
}, schemaOptions);

newsLibrarySchema.plugin(uniqueValidator);

newsLibrarySchema.statics = {
    findByMoviePermalink: function (moviePermalink, callback) {
        this.findOne({moviePermalink: moviePermalink}).
            exec(callback);
    },

    addFeedSources: function (moviePermalink, sourceUrls, callback) {
        return addElementsToSet.call(this, moviePermalink, 'feed', sourceUrls, callback);
    },

    addContact:  function (moviePermalink, contact, callback) {
        return addElementsToSet.call(this, moviePermalink, 'contacts', contact, callback);
    }
};

var addElementsToSet = function (moviePermalink, fieldName, fieldValuesArray, callback) {
    var query = {moviePermalink: moviePermalink};
    var update = {$addToSet: {}};
    update['$addToSet'][fieldName] = {};
    update['$addToSet'][fieldName]['$each'] = fieldValuesArray; //{$addToSet: {feed: {$each: fieldValuesArray}}};
    var options = {upsert: true};
    return this.findOneAndUpdate(query, update, options)
        .exec(callback);
};

newsLibrarySchema.methods.saveNews = function (callback) {
    return this.save(callback);
};

module.exports = mongoose.model('newsLibrary', newsLibrarySchema);