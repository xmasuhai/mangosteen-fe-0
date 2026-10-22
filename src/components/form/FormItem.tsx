import { computed, defineComponent, type PropType, ref, useId } from 'vue'
import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'
import { cn } from 'cn'
import type { FormDataType } from '@/shared/validator/formValidate.ts'
import { BarButton, type ButtonLevelType } from '@/components/BarButton.tsx'
import { LabelOrDivWrapper } from '@/components/form/LabelOrDivWrapper.tsx'
import { DatePickerPopup } from '@/components/form/DatePickerPopup.tsx'

export type FormItemType = 'text' | 'emojiSelector' | 'date' | 'submit-button' | 'button'

interface FormItemProps {
  type?: FormItemType
  modelValue?: FormDataType[string]
  visibleValue?: boolean
  error?: string
  hasErrorPlaceholder?: boolean
  label?: string
  hasLabelColon?: boolean
  buttonConfig?: { level?: ButtonLevelType, text?: string }
  onClick?: () => void
}

/**
 * @Description: 表单项组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-21 17:14:39
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 19:46:53
 * @FilePath: src/components/form/FormItem.tsx
 */
export const FormItem = defineComponent<FormItemProps>({
  name: 'FormItem',
  props: {
    type: { type: String as PropType<FormItemType>, },
    label: { type: String as PropType<string>, default: '', },
    hasLabelColon: { type: Boolean as PropType<boolean>, default: true, },
    modelValue: {
      type: [String, Number, null, undefined,] as PropType<FormDataType[string]>,
      default: '',
    },
    visibleValue: { type: Boolean as PropType<boolean>, default: false, },
    error: { type: String as PropType<string>, },
    hasErrorPlaceholder: { type: Boolean as PropType<boolean>, default: false, },
    buttonConfig: {
      type: Object as PropType<{ level?: ButtonLevelType, text?: string }>,
      default: () => ({ level: 'default', text: '确认' }),
    },
  },
  emit: ['update:modelValue', 'update:visibleValue',],
  setup( _props, _ctx ) {
    const extraHint = ref('')
    const getModelValue = computed({
      get() {return _props.modelValue?.toString()},
      set(value) {_ctx.emit('update:modelValue', value)}
    })
    const getVisibleValue = computed({
      get() {return _props.visibleValue},
      set(value) {_ctx.emit('update:visibleValue', value)}
    })
    const getIfNeedLabelFor = computed(() =>
      ['text', 'submit-button'].includes(_props?.type ?? ''))
    const getLabelFor = computed(() => getIfNeedLabelFor.value
        ? `form-item-${_props.type}-${useId()}`
        : '')

    const itemContent = computed(() => {
      switch (_props.type) {
        case 'text':
          return (
            <input
              id={getLabelFor.value}
              type="date"
              v-model={getModelValue.value}
              class={
                cn(
                  'p-x-1em text-18px',
                  'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
                  _props.error ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
                )
              }/>
          )
        case 'emojiSelector':
          return (
            <EmojiSelector
              v-model={getModelValue.value}
              hasError={!!_props.error}
              v-model:extraHint={extraHint.value} />
          )
        case 'submit-button':
          return <BarButton level={_props.buttonConfig?.level} id={getLabelFor.value} type="submit">
            {_props.buttonConfig?.text}
          </BarButton>
        case 'button':
          return <BarButton level={_props.buttonConfig?.level} id={getLabelFor.value} type="button">
            {_props.buttonConfig?.text}
          </BarButton>
        case 'date':
          return (
            <>
              <input
                id={getLabelFor.value}
                value={getModelValue.value}
                readonly={true}
                onClick={() => {getVisibleValue.value = true}}
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
        case undefined:
          return _ctx.slots.default?.()
      }
    })
    return () => (
      <div class="mt-.5em">
        <LabelOrDivWrapper
          ifUseLabelTag={getIfNeedLabelFor.value}
          labelFor={getLabelFor.value}>
          {/* 标题 */}
          {_props.label &&
            <span class="label_name">
              {_props.label}{_props.hasLabelColon ? '：' : ''}{extraHint.value}
            </span>
          }
          {/* 内容 */}
          <div class={cn('content-value flex mt-0.25em grow-1 children:grow-1 min-h-[var(--input-min-height)] max-w-100%')}>
            {itemContent.value}
          </div>
          {/* 错误 */}
          {
            (_props.error || _props.hasErrorPlaceholder)  &&
            <div class={cn('error-hint min-h-18px m-t-.25em text-12px color-[var(--error-color)]')}>
              <span>{_props.error}</span>
            </div>
          }
        </LabelOrDivWrapper>
      </div>
    )
  },
})
