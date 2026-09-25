import { defineComponent } from 'vue'
import pig from '@/assets/icons/pig.svg'
import { RouterLink } from 'vue-router'

/**
 * @Description: 欢迎页：存钱罐
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 12:11:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-25 21:44:34
 * @FilePath: src/modules/welcome/WelCome1stPage.tsx
 */
export const WelCome1stPage = defineComponent({
  name: 'WelCome1stPage',
  setup(/*props, ctx*/) {
    return () => (
      <>
        <img src={pig} alt="icon" class="w-128px h-130px mt-25%" />
        <div class="description flex flex-col items-center text-[2em]">
          <h2>会挣钱</h2>
          <h2>还要会省钱</h2>
        </div>
        <div class="go-next text-primaryColor mb-84px text-[2em] font-bold">
          <RouterLink to="/welcome/2">下一页</RouterLink>
        </div>
      </>
    )
  },
})
