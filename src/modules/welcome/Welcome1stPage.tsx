import type { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import wp from '@/modules/welcome/WelcomePage.module.scss'

/**
 * @Description: 欢迎页：存钱罐
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 12:11:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-10 14:48:49
 * @FilePath: src/modules/welcome/Welcome1stPage.tsx
 */
export const Welcome1stPage: FunctionalComponent = () => (
  <>
    <svg class={wp.logo}>
      <use xlinkHref="#pig"></use>
    </svg>
    <div class={wp.description}>
      <h2>会挣钱</h2>
      <h2>还要会省钱</h2>
    </div>
    <div class={wp['to-next-page']}>
      <RouterLink to="/welcome/2">下一页</RouterLink>
    </div>
  </>
)

Welcome1stPage.displayName = 'Welcome1stPage'
