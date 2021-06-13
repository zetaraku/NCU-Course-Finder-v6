import * as VueRouter from 'vue-router';
import * as VueGtag from 'vue-gtag-next';
import HelloWorld from '@/components/HelloWorld.vue';
import { ErrorPage404, ErrorPage418 } from '@/views/error';

const routes = [
  { path: '/', component: HelloWorld, props: { msg: 'Hello Vue 3 + Vite' } },
  { path: '/418', name: 'http-418', component: ErrorPage418 },
  { path: '/:pathMatch(.*)*', name: 'http-404', component: ErrorPage404 },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

VueGtag.trackRouter(router);

export default router;
