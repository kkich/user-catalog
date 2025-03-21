import { createRouter, createWebHistory } from 'vue-router';
import UserList from '@/components/UserList.vue';
import UserDetails from '@/components/UserDetails.vue';

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserDetails, props: true },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
