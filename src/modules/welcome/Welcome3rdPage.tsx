import chart from '@/assets/icons/chart.svg'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from '@/modules/welcome/WelcomeLayout.tsx'

/**
 * @Description: 欢迎页：图表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:13:51
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 22:47:30
 * @FilePath: src/modules/welcome/Welcome3rdPage.tsx
 */
export const Welcome3rdPage = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={chart} alt="chart" class="w-128px h-130px mt-25%" />,
      title: () => (
        <>
          <h2>数据可视化</h2>
          <h2>收支一目了然</h2>
        </>
      ),
      buttons: () => <RouterLink to="/welcome/4">下一页</RouterLink>,
    }}
  </WelcomeLayout>
)

Welcome3rdPage.displayName = 'Welcome3rdPage'
