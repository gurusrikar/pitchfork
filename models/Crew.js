var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;

var crewSchema = new mongoose.Schema({
    maleLeads: [String],
    femaleLeads: [String],
    director: [String],
    assistantDirector: [String],
    musicDirector: [String],
    producers: [String],
    cameraMan: [String],
    fightMasters: [String],
    storyWriters: [String],
    screenPlay: [String],
    dialogues: [String],
    comedians: [String],
    oppositeLeads: [String],
    editor: [String],
    visuals: [String],
    others: [String]
});

module.exports = crewSchema;