import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import notFound from '@/views/404'
import store from '@/store'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      // home和welcome的name会冲突，需注释
      // name: 'home',
      component: Home,
      children: [
        { path: '', name: 'welcome', component: Welcome },
        { path: 'article', name: 'article', component: Article },
        { path: 'image', name: 'image', component: Image },
        { path: 'publish', name: 'publish', component: Publish },
        { path: 'comment', name: 'comment', component: Comment },
        { path: 'setting', name: 'setting', component: Setting },
        { path: 'fans', name: 'fans', component: Fans }
      ]
    },
    { path: '*', name: 'notFound', component: notFound }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!store.getUser().token) return next('/login')
  // if (!store.getUser().token && to.path !== '/login') return next('/login')
  next()
})

export default router
