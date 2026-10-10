import { Transition, type FunctionalComponent, type VNode } from 'vue'
import { type RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import { cn } from 'cn'
import s from '@/views/WelcomeView.module.scss'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description: 欢迎页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 21:26:21
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-10 16:24:09
 * @FilePath: src/views/WelcomeView.tsx
 */
export const WelcomeView: FunctionalComponent = () => (
  <div class={s.wrapper}>
    <header class={s.title}>
      <SvgIcon class={s.logo} name="mangosteen"/>
      <h1>山竹记账</h1>
    </header>
    <main class={cn([s.main, 'mb-62px mx-16px', 'position-relative'])}>
      <RouterView name="main">
        {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
          <Transition
            name="slide-fade"
            enterActiveClass={s['slide-fade-enter-active']}
            leaveActiveClass={s['slide-fade-leave-active']}
            enterFromClass={s['slide-fade-enter-from']}
            leaveToClass={s['slide-fade-leave-to']}>
            <div
              key={route.path}
              class={cn([
                'bg-welcomeCardBg rounded-lg',
                'flex flex-col flex-grow items-center justify-around',
                'position-absolute top-0 left-0 h-100% w-100%',
              ])}>
              {Component}
            </div>
          </Transition>
        )}
      </RouterView>
    </main>

    <section class={s['to-last-page']}>跳过</section>
  </div>
)

WelcomeView.displayName = 'WelcomeView'
