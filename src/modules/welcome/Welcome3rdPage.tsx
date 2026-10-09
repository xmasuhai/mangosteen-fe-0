import type { FunctionalComponent } from 'vue'
import chart from '@/assets/icons/chart.svg'
import { RouterLink } from 'vue-router'
import wp from '@/modules/welcome/WelcomePage.module.scss'

/**
 * @Description: 欢迎页：图表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:13:51
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-08 23:33:09
 * @FilePath: src/modules/welcome/Welcome3rdPage.tsx
 */
export const Welcome3rdPage: FunctionalComponent = () => (
  <>
    <img src={chart} alt="chart" class={wp.logo} />
    <div class={wp.description}>
      <h2>数据可视化</h2>
      <h2>收支一目了然</h2>
    </div>
    <div class={wp['to-next-page']}>
      <RouterLink to="/welcome/4">下一页</RouterLink>
    </div>
  </>
)

Welcome3rdPage.displayName = 'Welcome3rdPage'
