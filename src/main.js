import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

axios.defaults.baseURL = '/api';

// Cookieを有効にする。
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.use(vuetify)

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
