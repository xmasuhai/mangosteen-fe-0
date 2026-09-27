import { defineComponent } from 'vue'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-27 12:33:54
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 14:54:47
 * @FilePath: src/modules/welcome/XxWelcome.tsx
 */
export const XxWelcome = defineComponent({
  name: 'XxWelcome',
  setup(_props, _ctx) {
    const { slots } = _ctx
    console.log('slots_______________________')
    console.log(slots)
    console.log('_______________________slots')
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
