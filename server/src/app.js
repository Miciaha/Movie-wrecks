require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
var mongoose = require("mongoose");
var randomWords = require("random-words");

var findMovies = require('./RandomMovies')

var Trivia = require("../models/trivia");

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/trivia", (req, res) => {
  Trivia.countDocuments().exec(function (err, count) {
    var random = Math.floor(Math.random() * count);

    Trivia.findOne()
      .skip(random)
      .exec(function (err, trivia) {
        res.send({
          trivia: trivia,
        });
      });
  });
});

app.get("/movies", (req, res) => {
  var request = req.query;
  var page = 1;
  var word = randomWords();

  findMovies(page,word,request).then(function(movies){
     res.send({
       movieList: movies,
     });
    console.log(movies)
  });
  
});

app.listen(process.env.PORT || 8081);
