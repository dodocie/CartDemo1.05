import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Address from '@/page/address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    }, {
      path: '/address',
      component: Address
    }
  ]
})
