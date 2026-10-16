import { defineComponent } from 'vue'
import { AmountNumberOutput } from '@/modules/items/AmountNumberOutput.tsx'
import { Numpad } from '@/modules/items/Numpad.tsx'
import { DateInput } from '@/modules/items/DateInput.tsx'

/**
 * @Description: 输入键盘组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:46:46
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 15:16:33
 * @FilePath: src/modules/items/InputPad.tsx
 */
export const InputPad = defineComponent({
  name: 'InputPad',
  setup(/* _props, _ctx */) {
    return () => (
      <>
        {/* 日期输入、金额显示 */}
        <div class="flex justify-between items-center py-1em b-t-[var(--pad-border-color)] b-t-1">
          <DateInput />
          <AmountNumberOutput class="mr-4" />
        </div>
        {/* 数字键盘 */}
        <Numpad />
      </>
    )
  },
})
