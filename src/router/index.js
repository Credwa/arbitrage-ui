import Vue from 'vue';
import Router from 'vue-router';

const firebase = require('../config/firebaseInit');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import('../containers/LandingPage.vue'),
      beforeEnter: (to, from, next) => {
        firebase.firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            next('/home');
          } else {
            // No user is signed in.
            next();
          }
        });
      },
      children: [
        { path: '', component: () => import('../pages/Intro.vue') },
        { path: '/pricing', component: () => import('../pages/Pricing.vue') },
      ],
    },
    {
      path: '/home',
      component: () => import('../containers/Main.vue'),
      beforeEnter: (to, from, next) => {
        firebase.firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            next();
          } else {
            // No user is signed in.
            next('/');
          }
        });
      },
      children: [
        { path: '', component: () => import('../pages/Home.vue') },
        { path: '/graphs', component: () => import('../pages/Graphs.vue') },
        { path: '/updates', component: () => import('../pages/Updates.vue') },
      ],
    },
    {
      // Always leave this as last one
      path: '*',
      component: () => import('../pages/404.vue'),
    },
  ],
});
