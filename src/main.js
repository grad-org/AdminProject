// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import http from './http.js'
import App from './App'
import store from './store.js'
import router from './router.js'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$serverUrl = 'http://forcar.vip:8080'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  http,
  components: { App },
  template: '<App/>'
})
