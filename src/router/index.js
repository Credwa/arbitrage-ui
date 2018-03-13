import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import Graphs from '@/containers/Graphs';
import Updates from '@/containers/Updates';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/graphs',
      name: 'Graphs',
      component: Graphs,
    },
    {
      path: '/updates',
      name: 'Updates',
      component: Updates,
    },
  ],
});
