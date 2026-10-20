import { defineComponent, type PropType /* type PropType */ } from 'vue'

/**
 * @Description: 记账总览组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 22:52:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-20 15:12:29
 * @FilePath: src/modules/items/ItemSummary.tsx
 */
export const ItemSummary = defineComponent({
  name: 'ItemSummary',
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
      // validator: (/* value */) => true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
      // validator: (/* value */) => true,
    },
  },
  setup(/* _props, _ctx */) {

    return () => <>ItemSummary</>
  },
})
