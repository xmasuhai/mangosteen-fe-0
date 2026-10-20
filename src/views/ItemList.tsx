import { defineComponent, reactive, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { ItemSummary } from '@/modules/items/ItemSummary.tsx'
import { DateTime } from '@/shared/dateTime.ts'
import { FloatButton } from '@/components/FloatButton.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-20 16:31:31
 * @FilePath: src/views/ItemList.tsx
 */
export const ItemList = defineComponent({
  name: 'ItemList',
  setup(/* _props, _ctx */) {
    const selectedDateRef = ref('本月')
    const currentDate = new DateTime()
    const customDate = reactive({start: new DateTime(), end: new DateTime()})
    const dateList = [
      {start: currentDate.firstDayOfMonth(), end: currentDate.lastDayOfMonth()},
      {
        start: currentDate.subtract(1, 'month').firstDayOfMonth(),
        end: currentDate.subtract(1, 'month').lastDayOfMonth()
      },
      {start: currentDate.firstDayOfYear(), end: currentDate.lastDayOfYear()},
    ] as const
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <SvgIcon name="menu" class="w-2em h-2em" />,
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                selected={selectedDateRef.value}
                v-model:selected={selectedDateRef.value}
                class="[&>nav>menu>li]:(text-start grow-0)">
                <ItemTab tabName="本月" tabId="thisMonth">
                  <ItemSummary
                    startDate={dateList[0].start.format()}
                    endDate={dateList[0].end.format()} />
                </ItemTab>
                <ItemTab tabName="上月" tabId="lastMonth">
                  <ItemSummary
                    startDate={dateList[1].start.format()}
                    endDate={dateList[1].end.format()} />
                </ItemTab>
                <ItemTab tabName="今年" tabId="thisYear">
                  <ItemSummary
                    startDate={dateList[2].start.format()}
                    endDate={dateList[2].end.format()} />
                </ItemTab>
                <ItemTab tabName="自定义范围" tabId="customRange">
                  <ItemSummary
                    startDate={customDate.start.format()}
                    endDate={customDate.end.format()} />
                </ItemTab>
              </SwitchTabs>

              <FloatButton class="fixed bottom-1em right-1em" iconName="add" />
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
