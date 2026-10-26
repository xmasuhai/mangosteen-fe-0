import { defineComponent } from 'vue'
import { ChartsSummary } from '@/modules/statistics/ChartsSummary.tsx'
import { DateTabsLayout } from '@/components/layout/DateTabsLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:41:25
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 17:03:49
 * @FilePath: src/views/StatisticsView.tsx
 */
export const StatisticsView = defineComponent({
  name: 'StatisticsView',
  setup(/* _props, _ctx */) {
    return () => (
      <DateTabsLayout title="统计图表">
        {{
          icon: () => <SvgIcon name="back-arrow" class="size-1.5em" />,
          default: ({ start, end }: { start: string; end: string }) => (
            <ChartsSummary startDate={start} endDate={end} />
          ),
        }}
      </DateTabsLayout>
    )
  },
})
