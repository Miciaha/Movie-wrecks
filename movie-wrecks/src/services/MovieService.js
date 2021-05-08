import Api from '@/services/Api'

export default {
    fetchMovies (genre, rating1, rating2){
        console.log(genre, rating1, rating2)

        return Api().get('movies', {
            params: {
                Genre: genre, 
                Rating1: rating1,
                Rating2: rating2
            }
        } )
    }
}