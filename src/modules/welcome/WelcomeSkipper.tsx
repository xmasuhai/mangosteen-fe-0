import { defineComponent } from 'vue'
import { cn } from 'cn'
import { RouterLink } from 'vue-router'

/**
 * @Description: 欢迎页跳过导航按钮
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:28:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 12:22:11
 * @FilePath: src/modules/welcome/WelcomeSkipper.tsx
 */
export const WelcomeSkipper = defineComponent({
  name: 'WelcomeSkipper',
  setup(/*props, ctx*/) {
    return () => (
      <section class={cn('color-[var(--title-text)] text-[1.5em]', 'top-0.5em right-0.5em fixed')}>
        <RouterLink to="/start">跳过</RouterLink>
      </section>
    )
  },
})
