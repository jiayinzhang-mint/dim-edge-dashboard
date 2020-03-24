import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/styles/style.css';

import InfoCard from '@/plugins/info-card/Main.vue';
import InputDialog from '@/plugins/input-dialog/Main.vue';
import Snack from '@/plugins/snackbar';
Vue.component('info-card', InfoCard);
Vue.component('input-dialog', InputDialog);
Vue.use(Snack);

import DateHelper from '@/utils/dateHelper';
import { cpuUsage, memUsage } from './utils/convert';

Vue.config.productionTip = false;

// format date
Vue.filter('format', (date: string, fmt: string) =>
  DateHelper.format(date, fmt)
);

// get cpu usage
Vue.filter('cpu', (v: string) => {
  if (v) {
    return cpuUsage(v);
  }
  return 0;
});

Vue.filter('mem', (v: string) => {
  if (v) {
    return memUsage(v);
  }
  return 0;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
