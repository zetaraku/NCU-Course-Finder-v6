import * as Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'bootstrap/dist/js/bootstrap';
import './styles/bootstrap-custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = Vue.createApp(App);

app.use(router);

app.mount('#app');
