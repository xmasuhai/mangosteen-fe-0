import { defineComponent, reactive, ref, } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { ItemSummary } from '@/modules/items/ItemSummary.tsx'
import { DateTime } from '@/shared/dateTime.ts'
import { FloatButton } from '@/components/FloatButton.tsx'
import { OverlayIcon } from '@/components/overlay/OverlayIcon.tsx'
import { CustomDateRangeOverlay } from '@/modules/items/CustomDateRangeOverlay.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 22:53:03
 * @FilePath: src/views/ItemListView.tsx
 */
export const ItemListView = defineComponent({
  name: 'ItemListView',
  setup(/* _props, _ctx */) {
    const selectedDateRef = ref('本月')
    const currentDate = new DateTime()
    const customDate = reactive<{ start: string; end: string }>({
      start: currentDate.getOriginDate()?.format(),
      end: currentDate.getOriginDate()?.format()
    })
    const itemTabList = [
      {
        tabName: '本月',
        tabId: 'thisMonth',
        start: currentDate.firstDayOfMonth().format(),
        end: currentDate.lastDayOfMonth().format(),},
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
    ] as const

    const overlayVisibleRef = ref(false)
    const openCustomDateRange = () => {
      overlayVisibleRef.value = selectedDateRef.value === '自定义日期范围'
    }

    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <OverlayIcon/>,
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                v-model:selected={selectedDateRef.value}
                onUpdate:selected={openCustomDateRange}
                class="[&>nav>menu>li]:(text-start grow-0)">
                {
                  itemTabList
                    .map(tabItem => (
                      <ItemTab tabName={tabItem.tabName} tabId={tabItem.tabId}>
                        <ItemSummary
                          startDate={tabItem.start}
                          endDate={tabItem.end} />
                      </ItemTab>
                    ))
                }
              </SwitchTabs>

              {/* 自定义日期范围弹出层 */}
              <CustomDateRangeOverlay
                v-model:customStartDate={customDate.start}
                v-model:customEndDate={customDate.end}
                v-model:visibleValue={overlayVisibleRef.value} />

              <FloatButton class="fixed bottom-1em right-1em" iconName="add" />
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
