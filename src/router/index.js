import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'
import Vs from '../pages/Vs.vue'
import CharacterStats from '../pages/CharacterStats.vue'
import Versus from '../pages/Versus.vue'
import Explore from '../pages/Explore.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/',
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
        component: Search
    },
    {
        path: '/Vs',
        name: 'Vs',
        component: Vs
    },
    {
        path: '/Details/:id',
        name: 'Details',
        component: CharacterStats
    },
    {
        path: '/Versus/:id/:id',
        name: 'Versus',
        component: Versus
    },
    {
        path: '/Explore',
        name: 'Explore',
        component: Explore
    }
  ]
})

export default router