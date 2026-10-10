import type { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import wp from '@/modules/welcome/WelcomePage.module.scss'

/**
 * @Description: 欢迎页：闹钟
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:11:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-10 14:52:49
 * @FilePath: src/modules/welcome/Welcome2ndPage.tsx
 */
export const Welcome2ndPage: FunctionalComponent = () => (
  <>
    <svg class={wp.logo}>
      <use xlinkHref="#clock"></use>
    </svg>
    <div class={wp.description}>
      <h2>每日提醒</h2>
      <h2>不会遗漏每一笔账单</h2>
    </div>
    <div class={wp['to-next-page']}>
      <RouterLink to="/welcome/3">下一页</RouterLink>
    </div>
  </>
)

Welcome2ndPage.displayName = 'Welcome2ndPage'
