const axios = require('axios')
require("dotenv").config()

module.exports = async function movieLocator(movie){
  var movie_locations
  return axios({
    "method":"GET",
    "url":"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":process.env.SOURCES,
    "x-rapidapi-key":process.env.KEY
    },"params":{
    "source_id":movie[0],
    "source":"imdb",
    "country":"US"
    }
    })
    .then((response)=>{
      if(response.data.collection.locations[0]){
         console.log(movie[0])
         console.log(response.data.collection.locations)
        movie["locations"] = response.data.collection.locations
        return movie
      }
    })
    .catch((error)=>{
      console.log(error)
      return error
    })
}