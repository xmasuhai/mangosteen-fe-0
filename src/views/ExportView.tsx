import { defineComponent /*,  type PropType */ } from 'vue'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:43:58
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 22:44:17
 * @FilePath: src/views/ExportView.tsx
 */
export const ExportView = defineComponent({
  name: 'ExportView',
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
    return () => <>ExportView 淘宝打印 combo</>
  },
})
