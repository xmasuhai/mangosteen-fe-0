import { computed, defineComponent, type PropType, type VNode } from 'vue'

/**
 * @Description: 表单label标签或div包装器
 * @Description: label.for input.id 联动
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-21 23:10:05
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 19:34:58
 * @FilePath: src/components/form/LabelOrDivWrapper.tsx
 */
export const LabelOrDivWrapper = defineComponent({
  name: 'LabelOrDivWrapper',
  props: {
    ifUseLabelTag: { type: Boolean, default: false },
    // for 属性，用于内部 input 标签 id 属性联动
    labelFor: { type: String, default: '' },
    label: { type: String as PropType<string> },
    hasLabelColon: { type: Boolean as PropType<boolean> },
    extraHint: { type: [String, Object] as PropType<string | VNode>, default: '', },
  },
  setup(_props, _ctx) {
    const labelContent = computed(() => (
      <>
        {_props.label}
        {_props.hasLabelColon ? '：' : ''}
        <span text-22px>{_props.extraHint}</span>
      </>
    ))
    return () =>
      _props.ifUseLabelTag ? (
        <label {...(_props.labelFor ? { for: _props.labelFor } : {})} class="form-label-sc">
          {labelContent.value}
        </label>
      ) : (
        <div class="form-label-sc">{labelContent.value}</div>
      )
  },
})
