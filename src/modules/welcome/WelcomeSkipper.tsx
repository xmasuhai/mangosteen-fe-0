import { defineComponent } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 欢迎页跳过导航按钮
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:28:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 14:13:01
 * @FilePath: src/modules/welcome/WelcomeSkipper.tsx
 */
export const WelcomeSkipper = defineComponent({
  name: 'WelcomeSkipper',
  setup(/*props, ctx*/) {
    return () => (
      <section
        class={cn(
          'color-[var(--title-text)] text-[1.5em]',
          'top-0.5em right-0.5em fixed',
        )}>
        跳过
      </section>
    )
  },
})
