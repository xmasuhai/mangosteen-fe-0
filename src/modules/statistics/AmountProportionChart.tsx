import { defineComponent /*,  type PropType */ } from 'vue'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 13:54:13
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 13:54:25
 * @FilePath: src/modules/statistics/AmountProportionChart.tsx
 */
export const AmountProportionChart = defineComponent({
  name: 'AmountProportionChart',
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
    return () => <>AmountProportionChart</>
  },
})
