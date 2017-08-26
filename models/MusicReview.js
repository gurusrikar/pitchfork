/**
 * Created by gurusrikar on 5/4/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

var singleReviewSchema = new Schema({
    userId: String,
    userUrl: String,
    rating: Number,
    reviewTitle: String,
    reviewText: String
}, schemaOptions);

var musicReviewSchema = new Schema ({
    moviePermalink: {type: String, unique: true},
    criticReviews: [singleReviewSchema],
    totalCriticRating: Number,
    numberOfCriticRatings: Number,

    userReviews: [singleReviewSchema],
    totalUserRating: Number,
    numberOfUserRatings: Number

}, schemaOptions);

musicReviewSchema.plugin(uniqueValidator);

var addReviewAndIncrement = function (moviePermalink, reviewType, reviewObject, callback) {
    var query = {moviePermalink: moviePermalink};
    var reviewField = 'userReviews';
    var incrementField1 = 'numberOfUserRatings';
    var incrementField2 = 'totalUserRating';
    if (reviewType === 'critic') {
        reviewField = 'criticReviews';
        incrementField1 = 'numberOfCriticRatings';
        incrementField2 = 'totalCriticRating';
    }
    var update = {$addToSet: {}, $inc: {}};
    update['$addToSet'][reviewField] = reviewObject;
    update['$inc'][incrementField1] = 1;
    update['$inc'][incrementField2] = reviewObject.rating;
    //{ $addToSet: { criticReviews: reviewObject }, $inc: { numberOfCriticRatings: 1, totalCriticRating: reviewObject.rating }

    var options = undefined;
    console.log('update-> '+update);
    this.findOneAndUpdate(query, update, options)
        .exec(callback);
};

musicReviewSchema.statics = {
    findByPermalink: function (moviePermalink, callback) {
        this.findOne({moviePermalink: moviePermalink})
            .exec(callback);
    },

    addCriticReview: function (moviePermalink, criticReview, callback) {
        return addReviewAndIncrement.call(this, moviePermalink, 'critic', criticReview, callback);
    },

    addUserReview: function (moviePermalink, userReview, callback) {
        return addReviewAndIncrement.call(this, moviePermalink, 'user', userReview, callback);
    }
};

musicReviewSchema.methods.createMusicReview = function (callback) {
    return this.save(callback);
};

module.exports = mongoose.model('musicReview', musicReviewSchema);