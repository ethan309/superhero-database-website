import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import CharacterSearch from '../components/CharacterSearch.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Search',
        name: 'Search',
        component: CharacterSearch
    }
  ]
})

export default router