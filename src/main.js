import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'
// 不属于js/vue/json，所以需要写完整路径
import '@/style/index.less'
import axios from '@/api'

import myCom from '@/components'
Vue.use(myCom)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
