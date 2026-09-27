import { defineComponent } from 'vue'

/**
 * @Description: 欢迎页插槽布局模板
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-27 12:33:54
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 17:51:16
 * @FilePath: src/modules/welcome/WelcomeLayout.tsx
 */
export const WelcomeLayout = defineComponent({
  name: 'WelcomeLayout',
  setup(_props, _ctx) {
    const { slots } = _ctx
    return () => (
      <>
        {slots?.icon?.()}
        {<div class="description flex flex-col items-center text-[2em]">{slots?.title?.()}</div>}
        <div class="go-next text-primaryColor mb-84px text-[2em] font-bold">
          {slots?.buttons?.()}
        </div>
      </>
    )
  },
})
