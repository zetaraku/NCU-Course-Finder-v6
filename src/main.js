import * as Vue from 'vue';
import VueGtagPlugin from 'vue-gtag-next';
import store from './store';
import router from './router';
import App from './App.vue';
import 'bootstrap/dist/js/bootstrap';
import './styles/bootstrap-custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.scss';

const app = Vue.createApp(App);

app.use(store);
app.use(router);
app.use(VueGtagPlugin, {
  property: {
    id: import.meta.env.VITE_GTAG_ID,
  },
});

app.mount('#app');
