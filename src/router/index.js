import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/containers/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld,
    },
  ],
});
