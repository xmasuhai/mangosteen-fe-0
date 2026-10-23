import { defineComponent /*,  type PropType */ } from 'vue'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:44:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 22:44:41
 * @FilePath: src/views/NotifyView.tsx
 */
export const NotifyView = defineComponent({
  name: 'NotifyView',
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
    return () => <>NotifyView</>
  },
})
