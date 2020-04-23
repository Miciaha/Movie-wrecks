<template>
    <div class="trivia">
       <div v-for="movie in trivia" v-bind:key="movie.id">
            <h3>
                <span>{{movie.title}}</span> <br />
            </h3>
            <img :src="movie.image" />
            <p>
              {{movie.trivia}}
            </p>
        </div>
    </div>
</template>

<script>
import TriviaService from '../services/TriviaService'
export default {
  name: 'trivia',
  data () {
    return {
        trivia: []
    }
  },
  mounted() {
      this.getTrivia()
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
