import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useRoomsStore} from "../stores/rooms";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:code',
      name: 'room',
      component: () => import('../views/RoomView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (from.name === 'room') {
    const roomStore = useRoomsStore();
    roomStore.clearFormsDetails();
  }
  next();
});

export default router
