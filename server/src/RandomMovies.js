const axios = require("axios");
var randomWords = require("random-words");
require("dotenv").config();


module.exports = async function movieFinder(page, word, request) {
  var matchedMovies = [];
  var finalMovieList = [];
  var fails = 0;
  
  return getMovies(page, word)
    .then(function (result) {
      return randomizeResults(result, word);
    })
    .then(function (result) {
      //Returns a list of movies from a random word.
      console.log(result)
      return findDetails(result);
    })
    .then((detailedResults) => {
      //Get movie details and check if they match the searched criteria
      return Promise.all(detailedResults.map(searchById));
    })
    .then(function (newResults) {
      //console.log(newResults)
      return Promise.all(
        newResults.map(function (x) {
          return matchPreference(x, request);
        })
      );
    })
    .then(function (movie_matches) {
      //console.log(movie_matches);
      //Filter out nulls from the list of unmatched movies
      movies = movie_matches.filter(function (el) {
        return el != null;
      });
      if (movies.length < 1) {
        fails = fails + 1;

        //console.log("Failure " + fails);
        return movieFinder(1, randomWords(), request);
      } else if (matchedMovies.length < 3) {
        for (let index = 0; index < movies.length; index++) {
          matchedMovies.push(movies[index]);
        }
        console.log(matchedMovies.length);
        return matchedMovies
      }
    })
    .catch((error) => {
      console.error(error);
      return movieFinder(1, randomWords(), request);
    });
};

async function getMovies(page, word) {
  var attempts = 0;
  return axios({
    method: "GET",
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": process.env.MOVIES,
      "x-rapidapi-key": process.env.KEY,
    },
    params: {
      page: page,
      r: "json",
      s: word,
      type: "movie",
    },
  })
    .then((response) => {
      return (response = response.data);
    })
    .catch((error) => {
      attempts = attempts + 1;

      if (attempts > 9) {
        res.send({
          response: null,
        });
      }
      console.log(error + " Retyring");
      getMovies(1, randomWords());
    });
}

function searchById(id) {
  var movie_details = [];
  return axios({
    method: "GET",
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": process.env.MOVIES,
      "x-rapidapi-key": process.env.KEY,
    },
    params: {
      i: id,
      r: "json",
      plot: "short",
    },
  })
    .then((response) => {
      movie_details.push(
        id,
        response.data["Title"],
        response.data["Genre"],
        response.data["Director"],
        response.data["Plot"],
        response.data["Rated"],
        response.data["Year"],
        response.data["Runtime"],
        response.data["imdbRating"],
        response.data["Poster"]
      );
      return movie_details;
    })
    .catch((error) => {
      console.log(error);
    });
}

function randomizeResults(results, word) {
  var page = Math.floor(Math.random() * (results.totalResults % 10)) + 1;

  return getMovies(page, word);
}

function findDetails(results) {
  var movieList = [];

  for (let index = 0; index < results.totalResults && index < 10; index++) {

    if(results.Search[index]["imdbID"] == undefined){
      continue;
    }
    else{
      
      const movie = results.Search[index]["imdbID"];

      movieList.push(movie);
    }

  }

  return movieList;
}

function matchPreference(movie, prefs) {
  var genre = movie[2];
  var rating = movie[3];
  var pref_genres = prefs["Genre"];
  var rating_start = prefs["Rating1"];
  var rating_end = prefs["Rating2"];
  var list_length = pref_genres.length;
  var genre_match = false;
  var rating_match = false;

  while (list_length--) {
    if (genre.indexOf(pref_genres[list_length]) != -1) {
      genre_match = true;
    }
  }

  if (rating_start == 0 && rating_end == 4) {
    //all ratings are good
    rating_match = true;
  } else if (rating_start == 0 && rating_end == 0) {
    if (rating > 8.9) {
      rating_match = true;
    }
  } else if (rating_start == 1 && rating_end == 1) {
    if (rating > 7.9 && rating < 9.0) {
      rating_match = true;
    }
  } else if (rating_start == 2 && rating_end == 2) {
    if (rating > 6.9 && rating < 8.0) {
      rating_match = true;
    }
  } else if (rating_start == 3 && rating_end == 3) {
    if (rating > 5.9 && rating < 7.0) {
      rating_match = true;
    }
  } else if (rating_start == 4 && rating_end == 4) {
    if (rating < 6) {
      rating_match = true;
    }
  } else if (rating_start == 0 && rating_end == 1) {
    if (rating > 7.9) {
      rating_match = true;
    }
  } else if (rating_start == 0 && rating_end == 2) {
    if (rating > 6.9) {
      rating_match = true;
    }
  } else if (rating_start == 0 && rating_end == 3) {
    if (rating > 5.9) {
      rating_match = true;
    }
  } else if (rating_start == 1 && rating_end == 2) {
    if (rating < 9 && rating > 7.9) {
      rating_match = true;
    }
  } else if (rating_start == 1 && rating_end == 3) {
    if (rating < 9 && rating > 6.9) {
      rating_match = true;
    }
  } else if (rating_start == 1 && rating_end == 4) {
    if (rating < 9) {
      rating_match = true;
    }
  } else if (rating_start == 2 && rating_end == 3) {
    if (rating < 7 && rating > 5.9) {
      rating_match = true;
    }
  } else if (rating_start == 2 && rating_end == 4) {
    if (rating < 7) {
      rating_match = true;
    }
  } else if (rating_start == 3 && rating_end == 4) {
    if (rating < 6) {
      rating_match = true;
    }
  }

  if (rating_match && genre_match) {
    return movie;
  } else {
    return null;
  }
}
