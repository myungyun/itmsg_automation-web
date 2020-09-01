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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
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
      path: '/ConnectedHost/edit',
      name: 'editConnectedHost',
      component: () => import( './components/editConnectedHost.vue')
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
    },
    {
      path: '/Host/edit/:id',
      name: 'editHost',
      component: () => import( './components/editHost.vue'),
      params: true
    },
    {
      path: '/template',
      name: 'Template',
      component: () => import( './components/Template.vue')
    },
    {
      path: '/Template/add',
      name: 'addTemplate',
      component: () => import( './components/addTemplate.vue')
    },
    {
      path: '/Template/edit/:id',
      name: 'editTemplate',
      component: () => import( './components/editTemplate.vue'),
      params: true
    },
    {
      path: '/ahtemplate',
      name: 'Adhoc',
      component: () => import( './components/Adhoc.vue')
    },
    {
      path: '/ahtemplate/add',
      name: 'addAdhoc',
      component: () => import( './components/addAdhoc.vue')
    },
    {
      path: '/ahtemplate/edit/:id',
      name: 'editAdhoc',
      component: () => import( './components/editAdhoc.vue'),
      params: true
    },
    {
      path: '/credential',
      name: 'Credential',
      component: () => import( './components/Credential.vue')
    },
    {
      path: '/Credential/add',
      name: 'addCredential',
      component: () => import( './components/addCredential.vue')
    },
    {
      path: '/Credential/edit/:id',
      name: 'editCredential',
      component: () => import( './components/editCredential.vue'),
      params: true
    },
    {
      path: '/Job',
      name: 'Job',
      component: () => import( './components/Job.vue')
    },
    {
      path: '/detail/Job/:id',
      name: 'jobDetail',
      component: () => import( './components/jobDetail.vue'),
      params: true
    }
  ]
})
