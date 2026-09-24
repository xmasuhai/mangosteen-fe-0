import type {RouteRecordRaw} from 'vue-router'
import {FooComp} from '@/views/FooComp.tsx'
import {BarComp} from '@/views/BarComp.tsx'
import {WelcomeView} from '@/views/WelcomeView.tsx'
import {WelCome1stPage} from '@/modules/welcome/WelCome1stPage.tsx'
import {Welcome2ndPage} from '@/modules/welcome/Welcome2ndPage.tsx'
import {Welcome3rdPage} from '@/modules/welcome/Welcome3rdPage.tsx'
import {Welcome4thPage} from '@/modules/welcome/Welcome4thPage.tsx'

/**
 * @Description: 路由表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 20:47:37
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-24 14:20:36
 * @FilePath: src/router/routes.ts
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'foo',
    component: FooComp,
  },
  {
    path: '/about',
    name: 'bar',
    component: BarComp,
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
    children: [
      {path: '1', component: WelCome1stPage,},
      {path: '2', component: Welcome2ndPage,},
      {path: '3', component: Welcome3rdPage,},
      {path: '4', component: Welcome4thPage,},
    ],
  },
] as const
