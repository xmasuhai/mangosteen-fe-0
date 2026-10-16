import { defineComponent, } from 'vue'
import { cn } from 'cn'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import type { SvgIconName } from '@svgoStore'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'
import s from '@/modules/items/Numpad.module.scss'

type ButtonItem<T extends boolean = boolean> = {
  text: string,
  onClick: () => void,
  gridArea: string,
  extraClass?: string,
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
 * @Description: 数字键盘
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 17:25:40
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 17:17:42
 * @FilePath: src/modules/items/Numpad.tsx
 */
export const Numpad = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Numpad',
  setup(/* _props, _ctx */) {
    const {appendText} = useNumpadAmountStore()
    const buttons: ButtonItem[] = [
      {text: '1', onClick: () => {appendText('1')}, gridArea: 'grid-area-[1/1/2/2]',},
      {text: '2', onClick: () => {appendText('2')}, gridArea: 'grid-area-[1/2/2/3]',},
      {text: '3', onClick: () => {appendText('3')}, gridArea: 'grid-area-[1/3/2/4]',},
      {text: '清空', onClick: () => {}, gridArea: 'grid-area-[1/4/2/5]',},
      {text: '4', onClick: () => {appendText('4')}, gridArea: 'grid-area-[2/1/3/2]',},
      {text: '5', onClick: () => {}, gridArea: 'grid-area-[2/2/3/3]',},
      {text: '6', onClick: () => {}, gridArea: 'grid-area-[2/3/3/4]',},
      {text: '删除', onClick: () => {}, hasIcon: true, iconName: 'backspace',
        gridArea: 'grid-area-[2/4/3/5]', extraClass: cn('children:w-1.5em children:h-1.5em'),},
      {text: '7', onClick: () => {}, gridArea: 'grid-area-[3/1/4/2]',},
      {text: '8', onClick: () => {}, gridArea: 'grid-area-[3/2/4/3]',},
      {text: '9', onClick: () => {}, gridArea: 'grid-area-[3/3/4/4]',},
      {text: '提交', onClick: () => {}, gridArea: 'grid-area-[3/4/5/5]',
        extraClass: cn('bg-[var(--pad-submit-button-bg-color)] text-[var(--button-text-color)]'),},
      {text: '0', onClick: () => {appendText('0')}, gridArea: 'grid-area-[4/1/5/3]',},
      {text: 'dot', onClick: () => {appendText('.')}, gridArea: 'grid-area-[4/3/5/4]',
        hasIcon: true, iconName: 'decimal_point', extraClass: cn('children:(w-2em h-2em translate-y-[-9px] font-extrabold)'),},
    ]
    const numberSizeClass = (text: string) => (/[0-9.]/g).test(text)
      ? cn('text-18px')
      : ''
    return () => (
      <div class={cn(
        // 'grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,56px)]',
        // 'bg-[var(--pad-border-color)] gap-1px p-t-1px',
        s['button-wrapper'],
      )}>
        {buttons.map((buttonItem) => (
          <button
            type="button"
            key={buttonItem.text}
            data-btn-text={`btn_${buttonItem.text}`}
            onClick={buttonItem.onClick}
            // style={{'grid-area': `btn_${buttonItem.text}`}}
            class={cn(
              'flex justify-center items-center font-bold',
              // 'bg-white b-unset',
              // buttonItem.gridArea,
              // buttonItem?.extraClass,
              numberSizeClass(buttonItem.text),
              s['button-item'],
            )}>
            {buttonItem.hasIcon ? <SvgIcon name={buttonItem.iconName} /> : buttonItem.text}
          </button>
        ))}
      </div>
    )
  },
})
