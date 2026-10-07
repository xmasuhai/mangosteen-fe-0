import { cloneVNode, type FunctionalComponent, type VNode } from 'vue'
import { type RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import { cn } from 'cn'
import s from '@/modules/welcome/WelcomeView.module.scss'
import logo from '@/assets/icons/mangosteen.svg'

/**
 * @Description: 欢迎页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 21:26:21
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-07 23:12:21
 * @FilePath: src/views/WelcomeView.tsx
 */
export const WelcomeView: FunctionalComponent = () => (
  <div class={s.wrapper}>
    <header class={s.title}>
      <img src={logo} alt="logo" />
      <h1>山竹记账</h1>
    </header>
    <main
      class={cn([
        s.main,
        'bg-welcomeCardBg mb-62px ml-16px mr-16px rounded-lg',
        'flex flex-col flex-grow items-center justify-around',
      ])}>
      <RouterView>
        {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) =>
          /* <Component key={route.path} /> */
          Component && cloneVNode(Component, { key: route.path })
        }
      </RouterView>
    </main>

    <section class={s['to-last-page']}>跳过</section>

  </div>
)

WelcomeView.displayName = 'WelcomeView'
