import Vue from 'vue';
import App from './App.vue';
import { msgfirst, msgsecond } from './vuedata32';
import vuefunc32 from './vuefunc32';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

vuefunc32(msgfirst);
vuefunc32(msgsecond);
