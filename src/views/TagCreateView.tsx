import { defineComponent /* type PropType */ } from 'vue'

/**
 * @Description: 创建标签页
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:53:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 16:01:08
 * @FilePath: src/views/TagCreateView.tsx
 */
export const TagCreateView = defineComponent({
  name: 'TagCreateView',
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
    return () => <>TagCreateView</>
  },
})
