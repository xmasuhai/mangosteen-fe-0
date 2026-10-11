import { defineComponent } from 'vue'
import { WelcomeHeader } from '@/modules/welcome/WelcomeHeader.tsx'
import { WelcomeSkipper } from '@/modules/welcome/WelcomeSkipper.tsx'
import { MainSwiper } from '@/modules/welcome/MainSwiper.tsx'
import s from '@/views/WelcomeView.module.scss'

/**
 * @Description: 欢迎页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 21:26:21
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-11 12:35:06
 * @FilePath: src/views/WelcomeView.tsx
 */
export const WelcomeView = defineComponent(
  () => {
    return () => (
      <div class={s.wrapper}>
        <WelcomeHeader />

        <MainSwiper />

        <WelcomeSkipper />
      </div>
    )
  },
  {
    props: {},
    name: 'WelcomeView',
  },
)
