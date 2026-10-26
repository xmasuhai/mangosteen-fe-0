import { type ComputedRef, type PropType, defineComponent, reactive, computed, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { CustomDateRangeOverlay } from '@/modules/items/CustomDateRangeOverlay.tsx'
import { DateTime } from '@/shared/dateTime.ts'

interface DateTab {
  tabName: string
  tabId: 'thisMonth' | 'lastMonth' | 'thisYear' | 'customDateRange'
  start: string
  end: string
}

/**
 * @Description: 日期选项卡布局
 * @Description: 包含本月、上月、今年、自定义日期范围选项卡，点击选项卡切换日期范围并触发默认插槽渲染
 * @Description: 向默认插槽传参 start, end
 * @Description: 自定义日期范围选项卡点击后，弹出自定义日期范围弹窗；自定义日期范围确认后，更新默认插槽渲染的日期范围
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-24 14:14:48
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 21:07:15
 * @FilePath: src/components/layout/DateTabsLayout.tsx
 */
export const DateTabsLayout = defineComponent({
  name: 'DateTabsLayout',
  props: {
    title: { type: String as PropType<string>, default: '' },
  },
  setup(_props, _ctx) {
    const currentDate = new DateTime()
    const customDate = reactive({
      start: currentDate.getOriginDate()?.format() || '',
      end: currentDate.getOriginDate()?.format() || '',
    })
    const itemTabList: ComputedRef<DateTab[]> = computed(() => [
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
    ])
    const selectedTabIdRef = ref<DateTab['tabId']>('thisMonth')
    const overlayVisibleRef = ref(false)
    const openCustomDateRange = () => {
      overlayVisibleRef.value = selectedTabIdRef.value === 'customDateRange'
    }
    return () => (
      <MainLayout>
        {{
          title: () => `${_props.title}`,
          icon: () => _ctx.slots?.icon?.(),
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                v-model:selectedTabId={selectedTabIdRef.value}
                onUpdate:selectedTabId={openCustomDateRange}
                class="[&>nav>menu>li]:(text-start grow-0)">
                {itemTabList.value.map((tabItem) => (
                  <ItemTab key={tabItem.tabId} tabName={tabItem.tabName} tabId={tabItem.tabId}>
                    {_ctx.slots?.default?.({ start: tabItem.start, end: tabItem.end })}
                  </ItemTab>
                ))}
              </SwitchTabs>

              {/* 自定义日期范围弹出层 */}
              <CustomDateRangeOverlay
                v-model:customStartDate={customDate.start}
                v-model:customEndDate={customDate.end}
                v-model:visibleValue={overlayVisibleRef.value}
              />
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
