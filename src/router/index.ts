import { createRouter, createWebHistory } from 'vue-router'
import {FooComp} from '@/views/FooComp.tsx'
import {BarComp} from '@/views/BarComp.tsx'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: '/foo',
    },
    {
      name: 'FooComp',
      path: '/foo',
      component: FooComp,
    },
    {
      name: 'BarComp',
      path: '/bar',
      component: BarComp,
    },
  ],
})

export default router
