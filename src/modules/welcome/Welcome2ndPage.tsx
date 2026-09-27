import { defineComponent } from 'vue'
import clock from '@/assets/icons/clock.svg'
import { RouterLink } from 'vue-router'

/**
 * @Description: 欢迎页：闹钟
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 13:11:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 11:25:35
 * @FilePath: src/modules/welcome/Welcome2ndPage.tsx
 */
export const Welcome2ndPage = defineComponent({
  name: 'Welcome2ndPage',
  setup(/*props, ctx*/) {
    return () => (
      <>
        <img src={clock} alt="clock" class="w-128px h-130px mt-25%" />
        <div class="description flex flex-col items-center text-[2em]">
          <h2>每日提醒</h2>
          <h2>不会遗漏每一笔账单</h2>
        </div>
        <div class="go-next text-primaryColor mb-84px text-[2em] font-bold">
          <RouterLink to="/welcome/3">下一页</RouterLink>
        </div>
      </>
    )
  },
})
