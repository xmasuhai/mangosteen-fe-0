import clock from '@/assets/icons/clock.svg'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from '@/modules/welcome/WelcomeLayout.tsx'

/**
 * @Description: 欢迎页：闹钟
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:11:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 22:46:47
 * @FilePath: src/modules/welcome/Welcome2ndPage.tsx
 */
export const Welcome2ndPage = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={clock} alt="clock" class="w-128px h-130px mt-25%" />,
      title: () => (
        <>
          <h2>每日提醒</h2>
          <h2>不会遗漏每一笔账单</h2>
        </>
      ),
      buttons: () => <RouterLink to="/welcome/3">下一页</RouterLink>,
    }}
  </WelcomeLayout>
)

Welcome2ndPage.displayName = 'Welcome2ndPage'
