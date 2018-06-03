// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSocketio from 'vue-socket.io';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import { store } from './store/store';

Vue.use(VueSocketio, 'http://ec2-52-55-213-204.compute-1.amazonaws.com:3000');
// Vue.use(VueSocketio, 'http://localhost:3000');

Vue.prototype.$API_URL =
  'http://ec2-52-55-213-204.compute-1.amazonaws.com:3000';
// Vue.prototype.$API_URL = 'http://localhost:3000';
Vue.use(Vuetify, {
  theme: {
    primary: '#1976d2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>',
});
