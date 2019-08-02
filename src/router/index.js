import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      // home和welcome的name会冲突，需注释
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome

        }
      ]
    }
  ]
})

export default router
