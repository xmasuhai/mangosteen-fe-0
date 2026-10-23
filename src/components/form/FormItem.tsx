import { computed, defineComponent, type PropType, ref, useId } from 'vue'
import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'
import type { FormDataType } from '@/shared/validator/formValidate.ts'
import { BarButton, type ButtonLevelType } from '@/components/BarButton.tsx'
import { LabelOrDivWrapper } from '@/components/form/items/LabelOrDivWrapper.tsx'
import { InputText } from '@/components/form/items/InputText.tsx'
import { InputDatePickerPopup } from '@/components/form/items/InputDatePickerPopup.tsx'
import { FormItemContentSlot } from '@/components/form/items/FormItemContentSlot.tsx'
import { cn } from 'cn'

export type FormItemType = 'text' | 'emojiSelector' | 'date' | 'submit' | 'button' | 'validationCode'

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
 * @LastEditTime: 2026-10-23 20:39:58
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
      ['text', 'submit', 'button', 'date'].includes(_props?.type ?? ''))
    const forId = useId()
    const getLabelFor = computed(() => getIfNeedLabelFor.value
        ? `form-item-${_props.type}-${forId}`
        : '')
    const itemTypeSwitchContent = computed(() => {
      switch (_props.type) {
        case 'text':
          return (
            <InputText
              error={_props.error}
              v-model={getModelValue.value}
              forId={getLabelFor.value} />
          )
        case 'emojiSelector':
          return (
            <EmojiSelector
              v-model={getModelValue.value}
              v-model:extraHint={extraHint.value}
              hasError={!!_props.error} />
          )
        case 'submit':
        case 'button':
          return <BarButton
                  level={_props.buttonConfig?.level}
                  forId={getLabelFor.value}
                  type={_props.type}
                  text={_props.buttonConfig?.text}/>
        case 'date':
          return (
            <InputDatePickerPopup
              forId={getLabelFor.value}
              v-model={getModelValue.value}
              v-model:visibleValue={getVisibleValue.value}
              error={_props.error}/>
          )
        case 'validationCode':
          return <>
            <InputText
              error={_props.error}
              v-model={getModelValue.value}
              forId={getLabelFor.value}
              class={cn('w-[6em]')} />
            <BarButton text="发送验证码" class={cn('ml-1em')}/>
          </>
        case undefined:
          return _ctx.slots.default?.()
      }
    })
    return () => (
      <div class="mt-.5em">
        <LabelOrDivWrapper
          ifUseLabelTag={getIfNeedLabelFor.value}
          labelFor={getLabelFor.value}>
          <FormItemContentSlot
            label={_props.label}
            hasLabelColon={_props.hasLabelColon}
            error={_props.error}
            hasErrorPlaceholder={_props.hasErrorPlaceholder}
            extraHint={extraHint.value}>
            {itemTypeSwitchContent.value}
          </FormItemContentSlot>
        </LabelOrDivWrapper>
      </div>
    )
  },
})
