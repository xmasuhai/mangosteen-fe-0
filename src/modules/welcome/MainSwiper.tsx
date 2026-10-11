import { defineComponent, onMounted, Transition, useTemplateRef, type VNode } from 'vue'
import { cn } from 'cn'
import s from '@/views/WelcomeView.module.scss'
import { type RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import { useSwipe } from '@/hooks/useSwipe.ts'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:31:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:44:53
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
        class={cn([s.main, 'mb-62px mx-16px', 'position-relative'])}>
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
    )
  },
})
