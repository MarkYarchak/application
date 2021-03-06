import Vue from 'vue';
import Vuex from 'vuex';
import './plugins/vuetify';
import App from './App';
import store from './store/store';


Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
