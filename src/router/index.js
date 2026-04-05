import { createRouter, createWebHistory } from 'vue-router'
import PageOne from '@/pages/PageOne.vue'
import PageTwo from '@/pages/PageTwo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/1',
    },
    {
      path: '/1',
      name: 'page-one',
      component: PageOne,
    },
    {
      path: '/2',
      name: 'page-two',
      component: PageTwo,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/1',
    },
  ],
})

export default router
