import { defineComponent } from 'vue'
import s from '@/views/WelcomeView.module.scss'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-11 12:28:28
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:30:37
 * @FilePath: src/views/WelcomeSkipper.tsx
 */
export const WelcomeSkipper = defineComponent({
  name: 'WelcomeSkipper',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    return () => <section class={s['to-last-page']}>跳过</section>
  },
})
