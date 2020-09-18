import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import './assets/css/global.css';



axios.defaults.baseURL = 'http://localhost:8888/jishi/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (sessionStorage.getItem('userAccount')) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
