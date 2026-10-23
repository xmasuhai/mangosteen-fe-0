import { computed, defineComponent, type PropType, } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 文本输入框
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 13:53:20
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 14:20:41
 * @FilePath: src/components/form/items/InputText.tsx
 */
export const InputText = defineComponent({
  name: 'InputText',
  props: {
    error: { type: String as PropType<string>, },
    forId: { type: String as PropType<string>, },
    modelValue: { type: String as PropType<string>, default: '', },
  },
  setup(_props, _ctx) {
    const getModelValue = computed({
      get() {
        return _props.modelValue?.toString() ?? ''
      },
      set(value) {
        _ctx.emit('update:modelValue', value)
      },
    })
    return () => (
      <input
        id={_props.forId}
        v-model={getModelValue.value}
        class={cn(
          'p-x-1em text-18px',
          'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
          _props.error ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
        )}
      />
    )
  },
})
