import type {FunctionalComponent} from 'vue'
import pig from '@/assets/icons/pig.svg'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from '@/modules/welcome/WelcomeLayout.tsx'

/**
 * @Description: 欢迎页：存钱罐
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 12:11:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-08 15:18:00
 * @FilePath: src/modules/welcome/Welcome1stPage.tsx
 */
export const Welcome1stPage: FunctionalComponent = () => (
  <WelcomeLayout
    v-slots={{
      icon: () => <img src={pig} alt="pig" class="w-128px h-130px mt-25% translate-y-1em" />,
      title: () => (
        <>
          <h2>会挣钱</h2>
          <h2>还要会省钱</h2>
        </>
      ),
      buttons: () => <RouterLink to="/welcome/2">下一页</RouterLink>,
    }}
  />
)

Welcome1stPage.displayName = 'Welcome1stPage'
