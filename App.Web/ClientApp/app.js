import Vue from 'vue'
import axios from 'axios'
import router from './router/index'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from 'components/app-root'
import { FontAwesomeIcon } from './icons'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCurrencyFilter from 'vue-currency-filter'

// Registration of global components
Vue.component('icon', FontAwesomeIcon);
Vue.use(VueCurrencyFilter,
  {
    symbol: '$',
    thousandsSeparator: ',',
    fractionCount: 0,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
  });
Vue.use(BootstrapVue);
Vue.prototype.$http = axios
var eventHub = new Vue();

sync(store, router);
Vue.mixin({
  data: function () {
    return {
      eventHub: eventHub
    }
  }
})
const app = new Vue({
  store,
  router,
  ...App
})

export {
  app,
  router,
  store
}
