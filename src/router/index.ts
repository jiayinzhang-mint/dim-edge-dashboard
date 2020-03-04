import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/index',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Service.vue')
      },
      {
        path: 'deployment',
        component: () => import('@/views/Service.vue')
      },
      {
        path: 'service',
        component: () => import('@/views/Service.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (from.query && !to.query) {
    if (to.path === from.path) {
      // console.log('Identical routes detected')
      return; // This is a no-no via the documentation, but a bug in routing to identical routes strips query params, and this prevents that
    }
    next({ path: to.path, query: from.query });
  }

  next();
});

export default router;
