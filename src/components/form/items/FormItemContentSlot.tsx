import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 表单项内容插槽
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 16:48:16
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 20:46:47
 * @FilePath: src/components/form/items/FormItemContentSlot.tsx
 */
export const FormItemContentSlot = defineComponent({
  name: 'FormItemContentSlot',
  props: {
    label: { type: String as PropType<string> },
    hasLabelColon: { type: Boolean as PropType<boolean> },
    extraHint: { type: String as PropType<string> },
    error: { type: String as PropType<string> },
    hasErrorPlaceholder: { type: Boolean as PropType<boolean> },
  },
  setup(_props, _ctx) {
    return () => (
      <>
        {/* 标题 */}
        {_props.label && (
          <span class="label_name">
            {_props.label}
            {_props.hasLabelColon ? '：' : ''}
            {_props.extraHint}
          </span>
        )}
        {/* 内容 */}
        <div
          class={cn(
            'form-item-content mt-0.25em min-h-[var(--input-min-height)] max-w-100%',
            'flex grow-1 children:grow-1',
          )}>
          {_ctx.slots.default?.()}
        </div>
        {/* 错误 */}
        {(_props.error || _props.hasErrorPlaceholder) && (
          <div class={cn('error-hint min-h-18px m-t-.25em text-12px color-[var(--error-color)]')}>
            <span>{_props.error ?? '　'}</span>
          </div>
        )}
      </>
    )
  },
})
