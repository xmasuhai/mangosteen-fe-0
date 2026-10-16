import { defineComponent, } from 'vue'
import { cn } from 'cn'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import type { SvgIconName } from '@svgoStore'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'
import s from '@/modules/items/Numpad.module.scss'

type ButtonItem<T extends boolean = boolean> = {
  id: string,
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
 * @LastEditTime: 2026-10-16 20:36:26
 * @FilePath: src/modules/items/Numpad.tsx
 */
export const Numpad = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Numpad',
  setup(/* _props, _ctx */) {
    const {
      appendText,
      clearText,
      backspaceText,
    } = useNumpadAmountStore()
    const buttons: ButtonItem[] = [
      {id: '1', text: '1', onClick: () => {appendText('1')},},
      {id: '2', text: '2', onClick: () => {appendText('2')},},
      {id: '3', text: '3', onClick: () => {appendText('3')},},
      {id: 'clear', text: Math.random() > .5 ? '归零' : '清空', onClick: () => {clearText()},},
      {id: '4', text: '4', onClick: () => {appendText('4')}, },
      {id: '5', text: '5', onClick: () => {appendText('5')}, },
      {id: '6', text: '6', onClick: () => {appendText('6')}, },
      {id: 'backspace', text: '退格', onClick: () => {backspaceText()}, hasIcon: true, iconName: 'backspace',
        extraClass: cn('children:(size-1.5em)'),},
      {id: '7', text: '7', onClick: () => {appendText('7')}, },
      {id: '8', text: '8', onClick: () => {appendText('8')},},
      {id: '9', text: '9', onClick: () => {appendText('9')}, },
      {id: 'submit', text: '提交', onClick: () => {},
        extraClass: cn('bg-[var(--pad-submit-button-bg-color)] text-[var(--button-text-color)]'),},
      {id: '0', text: '0', onClick: () => {appendText('0')}, },
      {id: 'dot', text: 'dot', onClick: () => {appendText('.')},
        hasIcon: true, iconName: 'decimal_point',
        extraClass: cn('children:(size-2em translate-y-[-9px] font-extrabold)'),},
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
          'btn_1 btn_2 btn_3 btn_clear'
          'btn_4 btn_5 btn_6 btn_backspace'
          'btn_7 btn_8 btn_9 btn_submit'
          'btn_0 btn_0 btn_dot btn_submit'
          `
        }}>
        {buttons.map((buttonItem) => (
          <button
            type="button"
            key={buttonItem.text}
            data-btn-text={`btn_${buttonItem.id}`}
            onClick={buttonItem.onClick}
            style={{
              'grid-area': `btn_${buttonItem.id}`,
            }}
            class={cn(
              'flex justify-center items-center font-bold',
              'bg-[var(--pad-button-bg-color)] b-unset',
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
