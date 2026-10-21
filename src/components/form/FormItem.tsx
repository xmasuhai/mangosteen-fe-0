import { computed, defineComponent, type PropType, ref, type UnwrapRef } from 'vue'
import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'
import { cn } from 'cn'
import type { FormDataType } from '@/shared/validator/formValidate.ts'

export type FormItemType = 'text' | 'emojiSelector' | 'date'

interface FormItemProps {
  modelValue?: UnwrapRef<FormDataType[string]>
  type?: FormItemType
  error?: string
  hasErrorPlaceholder?: boolean
  label?: string
  hasLabelColon?: boolean
}

/**
 * @Description: 表单项组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-21 17:14:39
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 21:52:17
 * @FilePath: src/components/form/FormItem.tsx
 */
export const FormItem = defineComponent<FormItemProps>({
  name: 'FormItem',
  props: {
    label: { type: String as PropType<string>, default: '', },
    hasLabelColon: { type: Boolean as PropType<boolean>, default: true, },
    type: { type: String as PropType<FormItemType>, },
    modelValue: {
      type: [String, Number, null, undefined,] as PropType<UnwrapRef<FormDataType[string]>>,
      default: '',
    },
    error: { type: String as PropType<string>, },
    hasErrorPlaceholder: { type: Boolean as PropType<boolean>, default: false, },
  },
  emit: ['update:modelValue',],
  setup( _props, _ctx ) {
    const extraHint = ref('')
    const itemContentCommonClass = cn('grow-1 min-h-[var(--input-min-height)] max-w-100%')
    const inputClass = cn(
      'p-x-1em text-18px',
      'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
      _props.error ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
    )
    const errorHintClass = cn('min-h-18px m-t-.25em text-12px color-[var(--error-color)]')
    const getModelValue = computed({
      get() {return _props.modelValue?.toString()},
      set(value) {_ctx.emit('update:modelValue', value)}
    })

    const itemContent = computed(() => {
      switch (_props.type) {
        case 'text':
          return (
            <input
              v-model={getModelValue.value}
              class={cn(inputClass)} />
          )
        case 'emojiSelector':
          return (
            <EmojiSelector
              v-model={getModelValue.value}
              hasError={!!_props.error}
              v-model:extraHint={extraHint.value} />
          )
        case 'date':
          return <input />
        case undefined:
          return _ctx.slots.default?.()
      }
    })

    return () => (
      <div class="mt-.5em">
        <label class="block">
          {/* 标题 */}
          {_props.label &&
            <span class="label_name">
              {_props.label}{_props.hasLabelColon ? '：' : ''}{extraHint.value}
            </span>
          }
          {/* 内容 */}
          <div class={cn(itemContentCommonClass, 'content-value flex mt-0.25em children:grow-1')}>
            {itemContent.value}
          </div>
          {/* 错误 */}
          {
            (_props.error || _props.hasErrorPlaceholder)  &&
            <div class={cn('error-hint', errorHintClass,)}>
              <span>{_props.error}</span>
            </div>
          }
        </label>
      </div>
    )
  },
})
