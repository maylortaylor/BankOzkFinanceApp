import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '../store/index';
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes
});


router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath === '/users') {
    if (!store.state.accessToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/users');
    }
  }
  next();
});

export default router
