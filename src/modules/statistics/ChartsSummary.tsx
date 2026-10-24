import { defineComponent, type PropType, ref } from 'vue'
import { FormItem } from '@/components/form/FormItem.tsx'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:55:11
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 23:02:02
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
    const kindOptions = Object.freeze([
      { value: 'expenses', label: '支出' },
      { value: 'incomes', label: '收入' },
    ])
    const kindRef = ref('expenses')
    return () => (
      <div class="mx-1em">
        <FormItem
          label="类型"
          type="select"
          v-model={kindRef.value}
          options={kindOptions}/>
      </div>
    )
  },
})
