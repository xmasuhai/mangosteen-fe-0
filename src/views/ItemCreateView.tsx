import { defineComponent /* type PropType */ } from 'vue'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:00:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 16:09:27
 * @FilePath: src/views/ItemCreateView.tsx
 */
export const ItemCreateView = defineComponent({
  name: 'ItemCreateView',
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
    return () => <>记一笔</>
  },
})
