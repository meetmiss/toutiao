import axios from 'axios'
import store from '@/store'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 拦截器
axios.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.response.use(function (res) {
  return res
}, function (err) {
  if (err.response.status === 401) {
    //   location.hash = '#/login'
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
