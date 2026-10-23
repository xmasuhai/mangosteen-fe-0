import type { RouteRecordRaw } from 'vue-router'
import { WelcomeView } from '@/views/WelcomeView.tsx'
import { Welcome1stPage } from '@/modules/welcome/Welcome1stPage.tsx'
import { Welcome2ndPage } from '@/modules/welcome/Welcome2ndPage.tsx'
import { Welcome3rdPage } from '@/modules/welcome/Welcome3rdPage.tsx'
import { Welcome4thPage } from '@/modules/welcome/Welcome4thPage.tsx'
import { StartAccountsView } from '@/views/StartAccountsView.tsx'
import { ItemsView } from '@/views/ItemsView.tsx'
import { ItemListView } from '@/views/ItemListView.tsx'
import { ItemCreate } from '@/views/ItemCreate.tsx'
import { TagView } from '@/views/TagView.tsx'
import { TagDetailEditView } from '@/views/TagDetailEditView.tsx'
import { TagCreateView } from '@/views/TagCreateView.tsx'
import { SignInView } from '@/views/SignInView.tsx'

/**
 * @Description: 路由表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 20:47:37
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 17:48:23
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
      { path: '', name: 'welcomeDefault', redirect: '/welcome/1', },
      { path: '1', name: 'welcomePig', components: { main: Welcome1stPage } },
      { path: '2', name: 'welcomeClock', components: { main: Welcome2ndPage } },
      { path: '3', name: 'welcomeChart', components: { main: Welcome3rdPage } },
      { path: '4', name: 'welcomeCloud', components: { main: Welcome4thPage } },
    ],
  },
  { path: '/sign_in', name: 'signIn', component: SignInView, },
  { path: '/start', name: 'startAccounts', component: StartAccountsView },
  { path: '/statistics', name: 'statistics', redirect: '/welcome/1', /*component: () => (<div></div>)*/ },
  { path: '/export', name: 'export',redirect: '/welcome/1', /*component: () => (<div></div>)*/ },
  { path: '/notify', name: 'notify',redirect: '/welcome/1', /*component: () => (<div></div>)*/ },
  { path: '/tech_stack', name: 'techStack', redirect: '/welcome/1', /*component: () => (<div></div>)*/ },
  /* 记账项目相关：项目列表页、创建页 */
  {
    path: '/items',
    name: 'items',
    component: ItemsView,
    children: [
      {
        path: '',
        name: 'ItemListView',
        component: ItemListView,
      },
      {
        path: 'create',
        component: ItemCreate,
      },
    ],
  },
  /* 标签项目相关：标签详细页、创建页 */
  {
    path: '/tags',
    name: 'tags',
    component: TagView,
    children: [
      { path: '', name: 'tagDefault', redirect: '/tags/create', },
      { path: 'create', name: 'tagCreate', component: TagCreateView },
      { path: 'edit/:id', name: 'tagEdit', component: TagDetailEditView },
    ],
  },
]
