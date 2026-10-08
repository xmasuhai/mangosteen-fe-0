import type {FunctionalComponent} from 'vue'
import pig from '@/assets/icons/pig.svg'
import { RouterLink } from 'vue-router'

/**
 * @Description: 欢迎页：存钱罐
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 12:11:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-08 21:50:25
 * @FilePath: src/modules/welcome/Welcome1stPage.tsx
 */
export const Welcome1stPage: FunctionalComponent = () => (
  <>
    <img src={pig} alt="pig" class="mt-25% translate-y-1em" />
    <div class="description flex flex-col items-center text-[2em]">
      <h2>会挣钱</h2>
      <h2>还要会省钱</h2>
    </div>
    <div class="text-primaryColor mb-84px text-[2em] font-bold">
      <RouterLink to="/welcome/2">下一页</RouterLink>
    </div>
  </>
)

Welcome1stPage.displayName = 'Welcome1stPage'
