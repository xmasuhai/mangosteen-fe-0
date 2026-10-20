import { defineComponent, type PropType /* type PropType */ } from 'vue'
import { DateTime } from '@/shared/dateTime.ts'

/**
 * @Description: 记账总览组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 22:52:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-20 14:51:28
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
    const t = new DateTime(new Date(2000, 0, 31, 0, 0, 0,))
    console.log( t.add(1, 'month').getRawDate() )


    return () => <>ItemSummary</>
  },
})
