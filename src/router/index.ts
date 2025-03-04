import { createRouter, createWebHistory } from 'vue-router';
import BirdGallery from '../components/BirdGallery.vue';
import BirdDetail from '../components/BirdDetail.vue';
import Login from '../components/Login.vue';

const routes = [
  { path: '/', component: BirdGallery },
  { path: '/bird/:id', name: 'bird', component: BirdDetail, props: true },
  { path: '/login', name: 'login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;