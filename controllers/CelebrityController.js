/**
 * Created by gurusrikar on 8/4/16.
 */
var mongoose = require('mongoose');
var Celebrity = require('../models/Celebrity');

var Responses = {
    MOVIE_NOT_FOUND: "permalink does not exist",
    SUCCESS: {success: true}
};

var createNewCelebrity = function (req, res, next) {
    res.json(Responses.SUCCESS);
};

module.exports = {
    createNewCelebrity: createNewCelebrity
};