import * as Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/scss/bootstrap.scss';

const app = Vue.createApp(App);

app.use(router);

app.mount('#app');
