import { defineComponent, onBeforeUnmount } from 'vue'
import s from '@/modules/items/Numpad.module.scss'
import { cn } from 'cn'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { useGlobalHintsBus, } from '@/shared/events/useGlobalHintsBus.ts'
import { numberLimitListener } from '@/modules/items/itemEvents.ts'
import { useNumpadButtons } from '@/modules/items/useNumpadButtons.tsx'

/**
 * @Description: 数字键盘
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 17:25:40
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 23:51:36
 * @FilePath: src/modules/items/Numpad.tsx
 */
export const Numpad = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Numpad',
  setup(/* _props, _ctx */) {
    const {on, off,} = useGlobalHintsBus()
    const unsubscribe = on(numberLimitListener)
    onBeforeUnmount(() => { off(numberLimitListener);unsubscribe() })
    const numberSizeClass = (text: string) =>
      (/[0-9|dot]/g.test(text) ? cn('text-18px') : '')
    const {numpadButtons}  = useNumpadButtons()
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
          `,
        }}>
        {numpadButtons.map((buttonItem) => (
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
