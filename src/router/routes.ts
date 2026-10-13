import type { RouteRecordRaw } from 'vue-router'
import { WelcomeView } from '@/views/WelcomeView.tsx'
import { Welcome1stPage } from '@/modules/welcome/Welcome1stPage.tsx'
import { Welcome2ndPage } from '@/modules/welcome/Welcome2ndPage.tsx'
import { Welcome3rdPage } from '@/modules/welcome/Welcome3rdPage.tsx'
import { Welcome4thPage } from '@/modules/welcome/Welcome4thPage.tsx'
import { StartAccountsView } from '@/views/StartAccountsView.tsx'

/**
 * @Description: 路由表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 20:47:37
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 11:54:59
 * @FilePath: src/router/routes.ts
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/welcome/1',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
    children: [
      // { path: '', name: 'default', component: WelCome1stPage },
      { path: '', name: 'welcomeDefault', redirect: '/welcome/1' },
      { path: '1', name: 'welcomePig', components: { main: Welcome1stPage } },
      { path: '2', name: 'welcomeClock', components: { main: Welcome2ndPage } },
      { path: '3', name: 'welcomeChart', components: { main: Welcome3rdPage } },
      { path: '4', name: 'welcomeCloud', components: { main: Welcome4thPage } },
    ],
  },
  {path: '/start', name: 'StartAccounts', component: StartAccountsView,},
]
