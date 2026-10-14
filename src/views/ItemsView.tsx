import { defineComponent /* type PropType */ } from 'vue'
import { RouterView } from 'vue-router'

/**
 * @Description: 记账项目页：记一笔
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:46:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 16:12:15
 * @FilePath: src/views/ItemsView.tsx
 */
export const ItemsView = defineComponent({
  name: 'ItemsView',
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
    return () => <RouterView/>
  },
})
