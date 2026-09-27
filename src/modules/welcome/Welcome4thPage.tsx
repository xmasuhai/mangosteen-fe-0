import cloud from '@/assets/icons/cloud.svg'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from '@/modules/welcome/WelcomeLayout.tsx'

/**
 * @Description: 欢迎页：云朵
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:14:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 22:47:41
 * @FilePath: src/modules/welcome/Welcome4thPage.tsx
 */
export const Welcome4thPage = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={cloud} alt="cloud" class="w-128px h-130px mt-25%" />,
      title: () => (
        <>
          <h2>云备份</h2>
          <h2>再也不怕数据丢失</h2>
        </>
      ),
      buttons: () => <RouterLink to="/start">开启应用</RouterLink>,
    }}
  </WelcomeLayout>
)

Welcome4thPage.displayName = 'Welcome4thPage'
