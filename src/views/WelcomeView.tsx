import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { cn } from 'cn'
import s from '@/modules/welcome/Welcome.module.scss'
import logo from '@/assets/icons/mangosteen.svg'

/**
 * @Description: 欢迎页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 21:26:21
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-25 21:28:50
 * @FilePath: src/views/WelcomeView.tsx
 */
export const WelcomeView = defineComponent({
  name: 'WelcomeView',
  setup(/*props, ctx*/) {
    return () => (
      <div class={s.wrapper}>
        <header class={s.title}>
          <img src={logo} alt="logo" />
          <h1>山竹记账</h1>
        </header>
        <main
          class={cn([
            'bg-welcomeCardBg mb-62px ml-16px mr-16px rounded-lg',
            'flex flex-col flex-grow items-center justify-around',
          ])}>
          <RouterView />
        </main>
      </div>
    )
  },
})
