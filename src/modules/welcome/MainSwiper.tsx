import { defineComponent, onMounted, Transition, useTemplateRef, type VNode } from 'vue'
import { cn } from 'cn'
import s from '@/views/WelcomeView.module.scss'
import { type RouteLocationNormalizedLoaded, RouterView } from 'vue-router'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:31:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:33:21
 * @FilePath: src/modules/welcome/MainSwiper.tsx
 */
export const MainSwiper = defineComponent({
  name: 'MainSwiper',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const inputRef = useTemplateRef('input')

    onMounted(() => {
      console.log('WelcomeView_______________________')
      console.log("%c 4 --> inputRef: ","color:#f00;", inputRef);
      console.log("%c 10 --> inputRef: ","color:#42b883;", inputRef.value);
      console.log('_______________________WelcomeView')
    })

    return () => (
      <main
        ref={inputRef}
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
