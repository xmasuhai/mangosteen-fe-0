import { defineComponent, type PropType, useModel } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 原始选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-24 22:50:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 23:13:16
 * @FilePath: src/components/form/SelectOrigin.tsx
 */
export const SelectOrigin = defineComponent({
  name: 'SelectOrigin',
  props: {
    forId: { type: String as PropType<string> },
    modelValue: { type: String as PropType<string>, default: '' },
    placeholder: { type: String as PropType<string>, default: '' },
    options: {
      type: Array as PropType<Readonly<{ label: string; value: string }[]>>,
      default: () => [],
    },
    error: { type: String as PropType<string> },
  },
  emit: ['update:modelValue'],
  setup(_props, _ctx) {
    const selectValue = useModel(_props, 'modelValue')
    return () => (
      <select
        id={_props.forId}
        v-model={selectValue.value}
        class={cn(
          'p-x-.5em text-18px',
          'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
          _props.error ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
        )}
        placeholder={_props.placeholder}>
        {_props.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  },
})
