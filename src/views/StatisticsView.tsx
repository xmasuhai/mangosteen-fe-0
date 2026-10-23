import { defineComponent, reactive, ref, } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { ChartsSummary } from '@/modules/statistics/ChartsSummary.tsx'
import { DateTime } from '@/shared/dateTime.ts'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:41:25
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 23:02:26
 * @FilePath: src/views/StatisticsView.tsx
 */
export const StatisticsView = defineComponent({
  name: 'StatisticsView',
  setup(/* _props, _ctx */) {
    const selectedDateRef = ref('本月')
    const currentDate = new DateTime()
    const customDate = reactive<{ start: string; end: string }>({
      start: currentDate.getOriginDate()?.format(),
      end: currentDate.getOriginDate()?.format(),
    })
    const itemTabList = [
      {
        tabName: '本月',
        tabId: 'thisMonth',
        start: currentDate.firstDayOfMonth().format(),
        end: currentDate.lastDayOfMonth().format(),
      },
      {
        tabName: '上月',
        tabId: 'lastMonth',
        start: currentDate.subtract(1, 'month').firstDayOfMonth().format(),
        end: currentDate.subtract(1, 'month').lastDayOfMonth().format(),
      },
      {
        tabName: '今年',
        tabId: 'thisYear',
        start: currentDate.firstDayOfYear().format(),
        end: currentDate.lastDayOfYear().format(),
      },
      {
        tabName: '自定义日期范围',
        tabId: 'customDateRange',
        start: customDate.start,
        end: customDate.end,
      },
    ]

    return () => (
      <MainLayout>
        {{
          title: () => '统计图表',
          icon: () => <SvgIcon name="back-arrow" size="1.5em" />,
          default: () => (
            <div>
              <SwitchTabs v-model:selected={selectedDateRef.value}>
                {itemTabList.map((tabItem) => (
                  <ItemTab tabName={tabItem.tabName} tabId={tabItem.tabId}>
                    <ChartsSummary startDate={tabItem.start} endDate={tabItem.end} />
                  </ItemTab>
                ))}
              </SwitchTabs>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
