import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/app',
      name: 'app',
      component: () => import(/* webpackChunkName: "download" */ './views/Download/index.vue'),
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: () => import(/* webpackChunkName: "hospital" */ './views/Hospital/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
