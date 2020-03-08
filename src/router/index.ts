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
        path: '/dashboard',
        component: () => import('@/views/service/Service.vue')
      },
      {
        path: '/deployment',
        component: () => import('@/views/service/Service.vue')
      },
      {
        path: '/service',
        component: () => import('@/views/service/Service.vue')
      },
      {
        path: '/service/:name',
        component: () => import('@/views/service/Info.vue')
      },
      {
        path: '/pod',
        component: () => import('@/views/pod/Pod.vue')
      },
      {
        path: '/pod/:name',
        component: () => import('@/views/pod/Info.vue')
      },
      {
        path: '/node',
        component: () => import('@/views/service/Service.vue')
      },
      {
        path: '/influxdb',
        component: () => import('@/views/influxdb/InfluxDB.vue')
      },
      {
        path: '/influxdb/:name',
        component: () => import('@/views/influxdb/Info.vue')
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
