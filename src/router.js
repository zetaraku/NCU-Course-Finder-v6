import * as VueRouter from 'vue-router';
import * as VueGtag from 'vue-gtag-next';
import Information from '@/components/Information.vue';
import CourseFinder from '@/components/CourseFinder.vue';
import MySchedule from '@/components/MySchedule.vue';
import About from '@/components/About.vue';
import { ErrorPage404, ErrorPage418 } from '@/components/ErrorViews';

const routes = [
  { path: '/', name: 'course-finder', component: CourseFinder },
  { path: '/information', name: 'information', component: Information },
  { path: '/course-finder', redirect: { name: 'course-finder' } },
  { path: '/my-schedule', name: 'my-schedule', component: MySchedule },
  { path: '/about', name: 'about', component: About },
  { path: '/418', name: 'http-418', component: ErrorPage418 },
  { path: '/:pathMatch(.*)*', name: 'http-404', component: ErrorPage404 },
];

if (import.meta.env.VITE_NO_INFORMATION_PAGE) {
  routes.splice(routes.findIndex(route => route.name === 'information'), 1);
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

VueGtag.trackRouter(router);

export default router;
