import { defineComponent, Transition, type VNode, useTemplateRef, watchEffect } from 'vue'
import { type RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import { cn } from 'cn'
import '@/modules/welcome/MainSwiper.scoped.scss'
import { useSwipe } from '@/hooks/useSwipe.ts'
import { throttle } from '@/shared/throttle.ts'

const routerToHash = {
  'welcomePig': '/welcome/2',
  'welcomeClock': '/welcome/3',
  'welcomeChart': '/welcome/4',
  'welcomeCloud': '/start',
}

/**
 * @Description: 欢迎页主轮播
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:31:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-12 22:24:28
 * @FilePath: src/modules/welcome/MainSwiper.tsx
 */
export const MainSwiper = defineComponent({
  name: 'MainSwiper',
  setup(/*props, ctx*/) {
    const mainRef = useTemplateRef<HTMLElement>('mainRef')
    const { isSwiping, direction } = useSwipe(mainRef)
    const router = useRouter()
    const route = useRoute()
    const throttledRouterReplace = throttle( () => {
      return router.replace(routerToHash[route.name as keyof typeof routerToHash])
    }, 500)
    watchEffect(async () => {
      if (isSwiping.value && direction.value === 'left') {
        await throttledRouterReplace()
      }
    })

    return () => (
      <main
        ref="mainRef"
        class={cn([
          'max-h-[calc(100%-360px)]',
          'flex flex-col flex-1',
          'mb-62px mx-16px',
          'position-relative',
        ])}>
        <RouterView name="main">
          {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
            <Transition
              name="slide-fade"
              enterActiveClass="slide-fade-enter-active"
              leaveActiveClass="slide-fade-leave-active"
              enterFromClass="slide-fade-enter-from"
              leaveToClass="slide-fade-leave-to">
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
    )
  },
})
