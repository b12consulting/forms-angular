var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ASchema = new Schema({
    surname: {type:String, required:true},
    forename: String,
    weight: Number,
    eyeColour: {type: String, enum:['Blue','Brown','Green','Hazel']},
    dateOfBirth: Date,
    accepted: Boolean
});

var A = mongoose.model('A', ASchema);

module.exports = A;