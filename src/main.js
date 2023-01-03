import * as Vue from 'vue';
import VueGtagPlugin from 'vue-gtag-next';
import VTooltipPlugin from 'v-tooltip';
import store from './store';
import router from './router';
import App from './App.vue';
import './styles/bootstrap-custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'v-tooltip/dist/v-tooltip.css';
import './styles/style.scss';

const app = Vue.createApp(App);

app.use(store);
app.use(router);
app.use(VueGtagPlugin, {
  property: {
    id: import.meta.env.VITE_GTAG_ID,
  },
});
app.use(VTooltipPlugin);

app.mount('#app');
