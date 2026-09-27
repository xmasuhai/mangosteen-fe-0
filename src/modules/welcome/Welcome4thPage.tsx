import {defineComponent} from 'vue'
import cloud from '@/assets/icons/cloud.svg'
import { RouterLink } from 'vue-router'

/**
 * @Description: 欢迎页：云朵
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:14:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 11:24:33
 * @FilePath: src/modules/welcome/Welcome4thPage.tsx
 */
export const Welcome4thPage = defineComponent({
  name: 'Welcome4thPage',
  setup(/*props, ctx*/) {
    return () => (
      <>
        <img src={cloud} alt="cloud" class="w-128px h-130px mt-25%" />
        <div class="description flex flex-col items-center text-[2em]">
          <h2>云备份</h2>
          <h2>再也不怕数据丢失</h2>
        </div>
        <div class="go-next text-primaryColor mb-84px text-[2em] font-bold">
          <RouterLink to="/start">开启应用</RouterLink>
        </div>
      </>
    )
  },
})
