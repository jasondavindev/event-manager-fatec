import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Event from '@/views/Event';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/event',
      name: 'Event',
      component: Event,
    },
  ],
});
