import Api  from '@/services/Api'

export default {
    fetchMovies (){
        return Api().get('movies')
    }
}