import { computed, defineComponent, type PropType } from 'vue'
import { cn } from 'cn'
import { DatePickerPopup } from '@/components/form/DatePickerPopup.tsx'

/**
 * @Description: 输入框带日期选择弹出框
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 14:20:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 15:38:26
 * @FilePath: src/components/form/items/InputDatePickerPopup.tsx
 */
export const InputDatePickerPopup = defineComponent({
  name: 'InputDatePickerPopup',
  props: {
    error: { type: String as PropType<string>, },
    forId: { type: String as PropType<string>, },
    modelValue: { type: String as PropType<string>, default: '', },
    visibleValue: { type: Boolean as PropType<boolean>, default: false, },
  },
  setup( _props, _ctx ) {
    const getModelValue = computed({
      get() {return _props.modelValue?.toString()},
      set(value) {_ctx.emit('update:modelValue', value)}
    })
    const getVisibleValue = computed({
      get() {return _props.visibleValue},
      set(value) {_ctx.emit('update:visibleValue', value)}
    })
    const toggleDatePickerPopup = () => {getVisibleValue.value = !getVisibleValue.value}
    return () => (
      <>
        <input
          id={_props.forId}
          value={getModelValue.value}
          readonly={true}
          onClick={toggleDatePickerPopup}
          class={
            cn(
              'p-x-1em text-18px',
              'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
              _props.error ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
            )
          }/>
        <DatePickerPopup
          v-model:popupVisible={getVisibleValue.value}
          v-model:dateStr={getModelValue.value} />
      </>
    )
  },
})
