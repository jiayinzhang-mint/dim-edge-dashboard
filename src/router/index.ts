import Vue from 'vue';
import VueRouter from 'vue-router';

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
        path: '/service',
        component: () => import('@/views/Service.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
