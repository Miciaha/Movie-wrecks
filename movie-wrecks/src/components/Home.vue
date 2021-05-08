<template>
<v-container fluid>
    <v-card 
        class="mx-auto"
        max-width="600"
        justify="center" align="center"
    >
    <v-row>
    <v-list-item >
        <v-list-item-content>
            <v-img
                :src="images.logo"
                max-width="75"
            ></v-img>
            <h2 class="headline">Select Your Criteria</h2>
        </v-list-item-content>
    </v-list-item>
    </v-row>

    <v-subheader> 
        Ratings 
        <v-icon small>far fa-question-circle </v-icon>
    </v-subheader>
    <v-card-text>
        <v-range-slider
            v-model="rating_range"
            :tick-labels="ratings"
            :max="4"
            ticks="always"
            step="1"
            tick-size="5"
        ></v-range-slider>
    </v-card-text>

    <v-subheader>
        Genres
    </v-subheader>
    <v-row align="center" justify="center">
    <div v-for="genre in genres" v-bind:key="genre.genre">
        <v-btn class="ma-2" outlined v-bind:class="{clicked:genre.selected}" v-on:click="genre.selected = !genre.selected">{{genre.genre}}</v-btn>
    </div>
    </v-row>
    <v-row justify="center">
        <v-btn class="ma-4" color="#F3CA40" v-on:click="searchMovies">Search</v-btn>
    </v-row>
    </v-card>
    <v-row justify="center" align="center">
      <div v-for="movie in movies" v-bind:key="movie[0]">
        <v-card class="ma-2" width="300">
          <v-row>
            <img height="400px" :src="movie[9]">
          </v-row>
          <v-card-title>{{movie[1]}}</v-card-title>
        </v-card>
      </div>
    </v-row>
    </v-container>
</template>

<script>
import MovieService from '../services/MovieService'
export default {
    name: "home",
    data: () => ({
        rating_range: [0, 4],
        ratings: [
            'A',
            'B',
            'C',
            'D',
            'F',
        ],
        genres: [
            { genre :'Comedy',
              selected: false},
            { genre :'Sci-Fi',
              selected: false},
            { genre :'Horror',
              selected: false},
            { genre : 'Romance',
              selected: false},
            { genre : 'Action',
              selected: false},
            { genre : 'Thriller',
              selected: false},
            { genre :'Drama',
              selected: false},
            { genre : 'Mystery',
              selected: false},
            { genre : 'Animation',
              selected: false},
            { genre : 'Adventure',
              selected: false},
            { genre : 'Fantasy',
              selected: false},
            { genre : 'Documentary',
              selected : false},
        ],
        images: {
            logo: require('../assets/popcorn.svg')
        },
        movies: [],
        selected_genres: [],
    }),
    methods:{
        async searchMovies(){
          this.selected_genres = []
          this.movies = []

            for (let index = 0; index < this.genres.length; index++) {

                if(this.genres[index].selected){
                    this.selected_genres.push(this.genres[index].genre)
                }
                
            }
            const response = await MovieService.fetchMovies(this.selected_genres, this.rating_range[0], this.rating_range[1])

            for (let index = 0; index < response.data.movieList.length; index++) {

              if(this.movies.includes(response.data.movieList[index][0])){
                continue;
              } else {
                this.movies.push(response.data.movieList[index])
              }

                
            }

        }
    }
}
</script>

<style>
.clicked {
    background: #067BC2;
    color: white !important;
}
</style>
