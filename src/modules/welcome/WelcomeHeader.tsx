import { defineComponent } from 'vue'
import s from '@/views/WelcomeView.module.scss'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:26:57
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:29:30
 * @FilePath: src/modules/welcome/WelcomeHeader.tsx
 */

export const WelcomeHeader = defineComponent({
  name: 'WelcomeHeader',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    return () => (
      <header class={s.title}>
        <SvgIcon class={s.logo} name="mangosteen" />
        <h1>山竹记账</h1>
      </header>
    )
  },
})
