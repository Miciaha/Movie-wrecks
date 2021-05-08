<template>
    <div class="trivia">
      <v-container fluid>
        <v-col cols="12">
       <div v-for="movie in trivia" v-bind:key="movie.id">
         <v-row :justify="justify">
            <h3>
                <span>{{movie.title}}</span> <br />
            </h3>
            </v-row>
            <v-row :justify="justify">
            <img :src="movie.image" />
            </v-row>
            <v-row :justify="justify">
            <p>
              {{movie.trivia}}
            </p>
            </v-row>
        </div>
        <v-row :justify="justify">
        <v-btn
      class="ma-2"
      :loading="loading4"
      :disabled="loading4"
      color="info"
      @click="loader = 'loading4'"
    >
      More Trivia
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon>fas fa-circle-notch fa-spin</v-icon>
        </span>
      </template>
    </v-btn>
        </v-row>
    </v-col>
    </v-container>
  </div>
</template>

<script>
import TriviaService from '../services/TriviaService'
export default {
  name: 'trivia',
  data () {
    return {
        trivia: [],
        loader: null,
        loading4: false,
        justify: 'center',
        alignment: 'center',
    }
  },
  mounted() {
      this.getTrivia()
  },
  watch:{
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false, this.getTrivia()), 1000)
      this.loader = null

    },
  },
  methods: {
    async getTrivia () {
      console.log("Getting trivia")
      const response = await TriviaService.fetchTrivia()
      this.trivia = response.data
    }  
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>