var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
var objectId = Schema.Types.ObjectId;

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

var celebritySchema = new mongoose.Schema({
    permalink: {type: String, unique: true},
    name: String,
    bio: String,
    avatarUrl: String,
    wikiUrl: String,
    movies: [{type: objectId, ref: 'movie'}]
}, schemaOptions);

celebritySchema.plugin(uniqueValidator);

celebritySchema.statics = {
    findByPermalink: function (permalink, callback) {
        this.findOne({permalink: permalink}).
            exec(callback);
    }
};

celebritySchema.methods.insertCelebrity = function (callback) {
    return this.save()
        .exec(callback);
};

celebritySchema.methods.updateCelebrity = function (callback) {
    return this.save()
        .exec(callback);
};

var celebrityModel = mongoose.model('celebrity', celebritySchema);
module.exports = celebrityModel;