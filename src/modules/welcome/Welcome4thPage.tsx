import type { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import wp from '@/modules/welcome/WelcomePage.module.scss'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description: 欢迎页：云朵
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:14:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 15:38:25
 * @FilePath: src/modules/welcome/Welcome4thPage.tsx
 */
export const Welcome4thPage: FunctionalComponent = () => (
  <>
    <SvgIcon class={wp.logo} name="cloud" />
    <div class={wp.description}>
      <h2>云备份</h2>
      <h2>再也不怕数据丢失</h2>
    </div>
    <div class={wp['to-next-page']}>
      <RouterLink to="/start">开启应用</RouterLink>
    </div>
  </>
)

Welcome4thPage.displayName = 'Welcome4thPage'
