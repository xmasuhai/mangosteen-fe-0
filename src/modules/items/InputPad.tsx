import { defineComponent } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { NumberOutput } from '@/modules/items/NumberOutput.tsx'
import { Numpad } from '@/modules/items/Numpad.tsx'

/**
 * @Description: 数字键盘组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:46:46
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 17:29:11
 * @FilePath: src/modules/items/InputPad.tsx
 */
export const InputPad = defineComponent({
  name: 'InputPad',
  setup(/* _props, _ctx */) {
    return () => (
      <>
        {/* 日期、金额输入 */}
        <div class="flex justify-between items-center py-1em b-t-[var(--button-border-color)] b-t-1">
          <span class="flex justify-start items-center">
            <SvgIcon name="date" class="size-2em mx-1 fill-[var(--button-bg)]" />
            <span class="animation-rainbow text-14px font-mono color-[var(--vp-c-brand-next)]">2027-01-01</span>
          </span>

          <NumberOutput class="mr-4" />
        </div>

        {/* 数字键盘 */}
        <Numpad />
      </>
    )
  },
})
