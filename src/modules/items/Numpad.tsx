import { defineComponent, } from 'vue'
import { cn } from 'cn'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import type { SvgIconName } from '@svgoStore'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'
import s from '@/modules/items/Numpad.module.scss'

type ButtonItem<T extends boolean = boolean> = {
  text: string,
  onClick: () => void,
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
 * @LastEditTime: 2026-10-16 18:03:20
 * @FilePath: src/modules/items/Numpad.tsx
 */
export const Numpad = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Numpad',
  setup(/* _props, _ctx */) {
    const {appendText} = useNumpadAmountStore()
    const buttons: ButtonItem[] = [
      {text: '1', onClick: () => {appendText('1')},},
      {text: '2', onClick: () => {appendText('2')},},
      {text: '3', onClick: () => {appendText('3')},},
      {text: '清空', onClick: () => {},},
      {text: '4', onClick: () => {appendText('4')}, },
      {text: '5', onClick: () => {}, },
      {text: '6', onClick: () => {}, },
      {text: '删除', onClick: () => {}, hasIcon: true, iconName: 'backspace',
        extraClass: cn('children:w-1.5em children:h-1.5em'),},
      {text: '7', onClick: () => {}, },
      {text: '8', onClick: () => {},},
      {text: '9', onClick: () => {}, },
      {text: '提交', onClick: () => {},
        extraClass: cn('bg-[var(--pad-submit-button-bg-color)] text-[var(--button-text-color)]'),},
      {text: '0', onClick: () => {appendText('0')}, },
      {text: 'dot', onClick: () => {appendText('.')},
        hasIcon: true, iconName: 'decimal_point',
        extraClass: cn('children:(w-2em h-2em translate-y-[-9px] font-extrabold)'),},
    ]
    const numberSizeClass = (text: string) => (/[0-9|dot]/g).test(text)
      ? cn('text-18px')
      : ''
    return () => (
      <div
        class={cn(
        'grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,56px)]',
        'bg-[var(--pad-border-color)] gap-1px p-t-1px',
        s['button-wrapper'],
        )}
        style={{
          'grid-template-areas': `
          'btn_1 btn_2 btn_3 btn_清空'
          'btn_4 btn_5 btn_6 btn_删除'
          'btn_7 btn_8 btn_9 btn_提交'
          'btn_0 btn_0 btn_dot btn_提交'
          `
        }}>
        {buttons.map((buttonItem) => (
          <button
            type="button"
            key={buttonItem.text}
            data-btn-text={`btn_${buttonItem.text}`}
            onClick={buttonItem.onClick}
            style={{
              'grid-area': `btn_${buttonItem.text}`,
            }}
            class={cn(
              'flex justify-center items-center font-bold',
              'bg-white b-unset',
              buttonItem?.extraClass,
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
