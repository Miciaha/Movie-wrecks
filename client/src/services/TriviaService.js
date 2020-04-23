import Api from '@/services/Api'

export default {
    fetchTrivia () {
        return Api().get('trivia')
    }
}