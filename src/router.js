import * as VueRouter from 'vue-router';
import * as VueGtag from 'vue-gtag-next';
import HelloWorld from '@/components/HelloWorld.vue';
import Information from '@/views/Information.vue';
import CourseFinder from '@/views/CourseFinder.vue';
import About from '@/views/About.vue';
import { ErrorPage404, ErrorPage418 } from '@/views/error';

const routes = [
  { path: '/', component: HelloWorld, props: { msg: 'Hello Vue 3 + Vite' } },
  { path: '/information', name: 'information', component: Information },
  { path: '/course-finder', name: 'course-finder', component: CourseFinder },
  { path: '/about', name: 'about', component: About },
  { path: '/418', name: 'http-418', component: ErrorPage418 },
  { path: '/:pathMatch(.*)*', name: 'http-404', component: ErrorPage404 },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

VueGtag.trackRouter(router);

export default router;
