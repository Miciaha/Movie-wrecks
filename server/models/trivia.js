var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TriviaSchema = new Schema({
    title: String,
    trivia: String,
    image: String
})

var Trivia = mongoose.model("Trivia", TriviaSchema)

module.exports = Trivia