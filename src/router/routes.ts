import {FooComp} from '@/views/FooComp.tsx'
import {BarComp} from '@/views/BarComp.tsx'

/**
 * @Description: 路由表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 20:47:37
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-22 20:49:38
 * @FilePath: src/router/routes.ts
 */
export const routes = [
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
]
