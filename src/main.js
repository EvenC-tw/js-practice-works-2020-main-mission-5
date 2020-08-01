import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';

import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.axios.defaults.headers.baseURL = `${process.env.VUE_APP_BASE_API}`;
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
