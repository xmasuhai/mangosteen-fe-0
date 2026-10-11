import { defineComponent } from 'vue'
import s from '@/views/WelcomeView.module.scss'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { cn } from 'cn'

/**
 * @Description: 欢迎页头部
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:26:57
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 13:52:23
 * @FilePath: src/modules/welcome/WelcomeHeader.tsx
 */
export const WelcomeHeader = defineComponent({
  name: 'WelcomeHeader',
  setup(/*props, ctx*/) {
    return () => (
      <header
        class={cn(
          s.title,
          'flex flex-shrink-1 flex-grow-0 flex-col items-center justify-center',
          'm-y-2em m-x-0 pt-10%',
          'text-2em color-[var(--title-text)]',
        )}>
        <SvgIcon class="w-64px h-69px" name="mangosteen" />
        <h1>山竹记账</h1>
      </header>
    )
  },
})
