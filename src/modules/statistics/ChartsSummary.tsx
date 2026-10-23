import { defineComponent, type PropType, } from 'vue'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:55:11
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 23:00:12
 * @FilePath: src/modules/statistics/ChartsSummary.tsx
 */
export const ChartsSummary = defineComponent({
  name: 'ChartsSummary',
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup( _props, _ctx ) {
    return () => (
      <div>
        {_props.startDate} <br/> {_props.endDate}
      </div>
    )
  },
})
