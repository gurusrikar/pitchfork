var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};


var musicAlbumSchema = new mongoose.Schema({
    moviePermalink: { type:String, unique: true},
    albumName: String,
    composer: {type: objectId, ref:'celebrity'},
    tracksUrl: String
}, schemaOptions);

musicAlbumSchema.plugin(uniqueValidator);

musicAlbumSchema.statics = {
    findByMoviePermalink: function (moviePermalink, callback) {
        this.findOne({moviePermalink: moviePermalink}).
            exec(callback);
    },

    findAlbumById: function (albumId, callback) {
        this.findById(albumId)
            .exec(callback);
    }

//    addATrack: function (moviePermalink, track, callback) {
//        var query = {moviePermalink: moviePermalink};
//        var update = {$addToSet: {tracks: track}};
//        var options = undefined;
//        this.findOneAndUpdate(query, update, options)
//            .exec(callback);
//    }

};

musicAlbumSchema.methods.saveNewMusicAlbum = function (callback) {
    return this.save(callback);
};

musicAlbumSchema.methods.updateMusicAlbum = function (callback) {
    return this.save(callback);
};


module.exports = mongoose.model('musicAlbum', musicAlbumSchema);