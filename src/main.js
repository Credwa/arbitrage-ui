// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSocketio from 'vue-socket.io';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';

Vue.use(VueSocketio, 'https://shielded-oasis-26232.herokuapp.com/');

Vue.use(Vuetify, { theme: {
  primary: '#1976d2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
} });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
