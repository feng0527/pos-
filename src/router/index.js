import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/component/page/pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: pos
    }
  ]
})
