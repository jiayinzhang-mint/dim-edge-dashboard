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
        path: '/dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue')
      },
      {
        path: '/influxdb',
        component: () => import('@/views/influxdb/InfluxDB.vue')
      },
      {
        path: '/influxdb/:name',
        component: () => import('@/views/influxdb/Info.vue'),
        children: [
          {
            path: '/influxdb/:name/metrics',
            component: () => import('@/views/influxdb/mods/Metrics.vue')
          },
          {
            path: '/influxdb/:name/query',
            component: () => import('@/views/influxdb/mods/Query.vue')
          }
        ]
      },
      {
        path: '/edgenode',
        component: () => import('@/views/dim-edge-node/Node.vue')
      },
      {
        path: '/edgenode/:name',
        component: () => import('@/views/dim-edge-node/Info.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
