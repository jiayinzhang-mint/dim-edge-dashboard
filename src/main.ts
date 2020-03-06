import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import InfoCard from '@/plugins/info-card/Main.vue';
Vue.component('info-card', InfoCard);

import DateHelper from '@/utils/dateHelper';

Vue.config.productionTip = false;

// format date
Vue.filter('format', (date: string, fmt: string) =>
  DateHelper.format(date, fmt)
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
