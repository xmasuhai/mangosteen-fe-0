import { defineComponent } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { NumberOutput } from '@/modules/items/NumberOutput.tsx'
import type { SvgIconName } from '@svgoStore'
import { cn } from 'cn'

type ButtonItem<T extends boolean = boolean> = {
  text: string,
  onClick: () => void,
  gridArea: string,
} & (T extends true
  ? {
      hasIcon: T,
      iconName: SvgIconName,
    }
  : {
      hasIcon?: false,
      iconName?: never,
    })

/**
 * @Description: 数字键盘组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:46:46
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 14:35:12
 * @FilePath: src/modules/items/InputPad.tsx
 */
export const InputPad = defineComponent({
  name: 'InputPad',
  setup(/* _props, _ctx */) {
    const buttons: ButtonItem[] = [
      {text: '1', onClick: () => {}, gridArea: 'grid-area-[1/1/2/2]',},
      {text: '2', onClick: () => {}, gridArea: 'grid-area-[1/2/2/3]',},
      {text: '3', onClick: () => {}, gridArea: 'grid-area-[1/3/2/4]',},
      {text: '清空', onClick: () => {}, gridArea: 'grid-area-[1/4/2/5]',},
      {text: '4', onClick: () => {}, gridArea: 'grid-area-[2/1/3/2]',},
      {text: '5', onClick: () => {}, gridArea: 'grid-area-[2/2/3/3]',},
      {text: '6', onClick: () => {}, gridArea: 'grid-area-[2/3/3/4]',},
      {text: '删除', onClick: () => {}, hasIcon: true, iconName: 'backspace', gridArea: 'grid-area-[2/4/3/5]',},
      {text: '7', onClick: () => {}, gridArea: 'grid-area-[3/1/4/2]',},
      {text: '8', onClick: () => {}, gridArea: 'grid-area-[3/2/4/3]',},
      {text: '9', onClick: () => {}, gridArea: 'grid-area-[3/3/4/4]',},
      {text: '提交', onClick: () => {}, gridArea: 'grid-area-[3/4/5/5]',},
      {text: '0', onClick: () => {}, gridArea: 'grid-area-[4/1/5/3]',},
      {text: '.', onClick: () => {}, gridArea: 'grid-area-[4/3/5/4]',},
    ]
    return () => (
      <>
        {/* 日期、金额输入 */}
        <div class="">
          <span class="notes">
            <SvgIcon name="date" />
            <span>2027-01-01</span>
          </span>
          <span class="amount">
            <NumberOutput />
          </span>
        </div>

        {/* 数字键盘 */}
        <div class={cn(
          'grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,48px)]',
          'bg-[var(--button-border-color)] gap-1px p-1px',
          'children-bg-white children-b-none'
        )}>
          {buttons.map((buttonItem) => (
            <button
              type="button"
              onClick={buttonItem.onClick}
              class={cn(
                'flex justify-center items-center',
                buttonItem.gridArea,
              )}>
              {buttonItem.hasIcon ? <SvgIcon name={buttonItem.iconName} /> : buttonItem.text}
            </button>
          ))}
        </div>
      </>
    )
  },
})
