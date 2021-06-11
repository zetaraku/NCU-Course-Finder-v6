import * as VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';

const routes = [
  { path: '/', component: HelloWorld, props: { msg: 'Hello Vue 3 + Vite' } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
