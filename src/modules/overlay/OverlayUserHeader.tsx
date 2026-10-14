import { defineComponent /* type PropType */ } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 划出浮层用户头
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 14:56:48
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 15:04:05
 * @FilePath: src/modules/overlay/OverlayUserHeader.tsx
 */
export const OverlayUserHeader = defineComponent({
  name: 'OverlayUserHeader',
  setup(/* _props, _ctx */) {
    const onClickSignIn = () => { console.log('点击登录') }

    return () => (
      <section
        onClick={onClickSignIn}
        class={cn(
          'p-y-2em p-x-1em',
          'bg-[var(--overlay-user-bg)] text-[var(--overlay-user-text)]',
        )}>
        <h2>未登录用户</h2>
        <p>点击这里登录</p>
      </section>
    )
  },
})
