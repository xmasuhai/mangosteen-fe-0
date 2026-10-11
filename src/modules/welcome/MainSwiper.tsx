import { defineComponent, onMounted, Transition, useTemplateRef, type VNode } from 'vue'
import { type RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import { cn } from 'cn'
import '@/modules/welcome/MainSwiper.scoped.scss'
import { useSwipe } from '@/hooks/useSwipe.ts'

/**
 * @Description: 欢迎页主轮播
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:31:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 14:10:45
 * @FilePath: src/modules/welcome/MainSwiper.tsx
 */
export const MainSwiper = defineComponent({
  name: 'MainSwiper',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const mainRef = useTemplateRef<HTMLElement>('mainRef')

    const {isSwiping}  =  useSwipe(mainRef)

    onMounted(() => {
      console.log('WelcomeView_______________________')
      console.log("%c 5 --> isSwiping: ","color:#ff6a00;", isSwiping);
      console.log("%c 4 --> mainRef: ","color:#f00;", mainRef);
      console.log("%c 10 --> mainRef: ","color:#42b883;", mainRef.value);
      console.log('_______________________WelcomeView')
    })

    return () => (
      <main
        ref="mainRef"
        class={cn([
          'max-h-[calc(100%-360px)]',
          'flex flex-col flex-1',
          'mb-62px mx-16px',
          'position-relative'
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
