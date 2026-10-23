import { defineComponent, reactive, ref, } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { ItemSummary } from '@/modules/items/ItemSummary.tsx'
import { DateTime } from '@/shared/dateTime.ts'
import { FloatButton } from '@/components/FloatButton.tsx'
import { Overlay } from 'vant'
import { FormContainer } from '@/components/form/FormContainer.tsx'
import { FormItem } from '@/components/form/FormItem.tsx'
import { OverlayIcon } from '@/components/overlay/OverlayIcon.tsx'
import cssVars from '@/assets/styles/vars.module.scss';

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 17:48:01
 * @FilePath: src/views/ItemListView.tsx
 */
export const ItemListView = defineComponent({
  name: 'ItemListView',
  setup(/* _props, _ctx */) {
    const {zIndexFloatOverlay,} = cssVars
    const selectedDateRef = ref('本月')
    const currentDate = new DateTime()
    const customDate = reactive<{ start: string; end: string }>({
      start: currentDate.getOriginDate()?.format(),
      end: currentDate.getOriginDate()?.format()
    })

    const dateList = [
      {start: currentDate.firstDayOfMonth().format(), end: currentDate.lastDayOfMonth().format(),},
      {
        start: currentDate.subtract(1, 'month').firstDayOfMonth().format(),
        end: currentDate.subtract(1, 'month').lastDayOfMonth().format(),
      },
      {start: currentDate.firstDayOfYear().format(), end: currentDate.lastDayOfYear().format(),},
    ] as const

    const customDateRangeOverlayVisibleRef = ref(false)
    const onSubmitCustomDateRange = (e: SubmitEvent) => {
      e.preventDefault()
      customDateRangeOverlayVisibleRef.value = false
    }
    const onCancelCustomDateRange = () => {
      customDateRangeOverlayVisibleRef.value = false
    }
    const openCustomDateRange = () => {
      customDateRangeOverlayVisibleRef.value = selectedDateRef.value === '自定义日期范围'
    }

    const startDateVisibleRef = ref(false)
    const endDateVisibleRef = ref(false)

    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <OverlayIcon/>,
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                selected={selectedDateRef.value}
                v-model:selected={selectedDateRef.value}
                onUpdate:selected={openCustomDateRange}
                class="[&>nav>menu>li]:(text-start grow-0)">
                <ItemTab tabName="本月" tabId="thisMonth">
                  <ItemSummary
                    startDate={dateList[0].start}
                    endDate={dateList[0].end} />
                </ItemTab>
                <ItemTab tabName="上月" tabId="lastMonth">
                  <ItemSummary
                    startDate={dateList[1].start}
                    endDate={dateList[1].end} />
                </ItemTab>
                <ItemTab tabName="今年" tabId="thisYear">
                  <ItemSummary
                    startDate={dateList[2].start}
                    endDate={dateList[2].end} />
                </ItemTab>
                <ItemTab tabName="自定义日期范围" tabId="customDateRange">
                  <ItemSummary
                    startDate={customDate.start}
                    endDate={customDate.end} />
                </ItemTab>
              </SwitchTabs>

              {/* 自定义日期范围弹出层-仅和有对应的ItemTab关联待重构 */}
              <Overlay
                z-index={zIndexFloatOverlay}
                show={customDateRangeOverlayVisibleRef.value}
                onClick={onCancelCustomDateRange}
                class="flex items-center justify-center bg-[var(--overlay-mask-bg)]" >
                <div
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                  class="bg-[var(--overlay-bg)] w-80vw h-35vh">
                  <header class="bg-[var(--main)] text-[var(--dialog-header-text)] py-12px px-1em">
                    请选择时间
                  </header>
                  <main>
                    <FormContainer onSubmit={onSubmitCustomDateRange}>
                      <FormItem type="date" label="开始时间" v-model={customDate.start} v-model:visibleValue={startDateVisibleRef.value} />
                      <FormItem type="date" label="结束时间" v-model={customDate.end} v-model:visibleValue={endDateVisibleRef.value} />
                      <footer class="flex justify-between mt-1em children:(w-[calc(50%-.25em)])">
                        <FormItem type="button" onClick={onCancelCustomDateRange} buttonConfig={{level: 'default', text: '取 消' }}/>
                        <FormItem type="submit" buttonConfig={{level: 'primary', text: '确 认' }}/>
                      </footer>
                    </FormContainer>
                  </main>
                </div>
              </Overlay>

              <FloatButton class="fixed bottom-1em right-1em" iconName="add" />
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
