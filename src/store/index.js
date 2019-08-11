const KEY = 'toutiao-user'
export default {
  setUser (user) {
    const localUser = this.getUser()
    // 后面的user会替代localUser中的相同属性
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
