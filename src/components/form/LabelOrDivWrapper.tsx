import { defineComponent } from 'vue'

/**
 * @Description: 表单标签或div包装器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-21 23:10:05
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 23:13:50
 * @FilePath: src/components/form/LabelOrDivWrapper.tsx
 */
export const LabelOrDivWrapper = defineComponent({
  name: 'LabelOrDivWrapper',
  props: {
    ifUseLabelTag: { type: Boolean, default: false },
    labelFor: { type: String, default: '' },
  },
  setup(_props, _ctx) {
    return () =>
      _props.ifUseLabelTag ? (
        <label {...(_props.labelFor ? { for: _props.labelFor } : {})} class="block">
          {_ctx.slots.default?.()}
        </label>
      ) : (
        <div>{_ctx.slots.default?.()}</div>
      )
  },
})
