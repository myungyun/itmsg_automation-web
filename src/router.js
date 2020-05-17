import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/Inventory',
      name: 'Inventory',
      component: () => import( './components/Inventory.vue')
    },
    {
      path: '/Inventory/add',
      name: 'addInventory',
      component: () => import( './components/addInventory.vue')
    },
    {
      path: '/Host',
      name: 'Host',
      component: () => import( './components/Host.vue')
    },
    {
      path: '/Host/add',
      name: 'addHost',
      component: () => import( './components/addHost.vue')
    }
  ]
})
