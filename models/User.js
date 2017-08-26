/**
 * Created by gurusrikar on 12/4/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
var hasher = require("bcrypt-nodejs");
var objectId = Schema.Types.ObjectId;

var schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }};

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: {type: String, unique: true},
    password: String,
    bio: String,
    avatarUrl: String,
    admin: Boolean
}, schemaOptions);

userSchema.plugin(uniqueValidator);

userSchema.statics = {
    findByUsername: function (username, callback) {
        this.findOne({username: username}).
            exec(callback);
    },

    findByUserId: function (id, callback) {
        this.findById(id, callback);
    }
};

userSchema.methods.createNewUser = function (callback) {
    return this.save(callback);
};

userSchema.methods.updateUser = function (callback) {
    return this.save(callback);
};

userSchema.methods.generateHash = function (password) {
    return hasher.hashSync(password, hasher.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return hasher.compareSync(password, this.password);
};

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;