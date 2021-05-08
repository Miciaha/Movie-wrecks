import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Trivia from '@/components/Trivia'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/trivia',
      name: 'Trivia',
      component: Trivia
    },
    {
      path: '/check',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})