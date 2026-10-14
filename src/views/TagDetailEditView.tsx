import { defineComponent /* type PropType */ } from 'vue'

/**
 * @Description: 标签详情编辑页
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:54:11
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 16:01:24
 * @FilePath: src/views/TagDetailEditView.tsx
 */
export const TagDetailEditView = defineComponent({
  name: 'TagDetailEditView',
  props: {
    /*
    propsName: {
      type: String as PropType<string>,
      required: false,
      validator: (/!* value *!/) => true,
    }
  */
  },
  setup(/* _props, _ctx */) {
    return () => <>TagDetailEditView</>
  },
})
