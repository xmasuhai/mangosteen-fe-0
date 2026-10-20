import { defineComponent, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { ItemSummary } from '@/modules/items/ItemSummary.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 23:01:50
 * @FilePath: src/views/ItemList.tsx
 */
export const ItemList = defineComponent({
  name: 'ItemList',
  setup(/* _props, _ctx */) {
    const selectedDateRef = ref('本月')
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
                  <ItemSummary startDate="2026-11-01" endDate="2026-12-31" />
                </ItemTab>
                <ItemTab tabName="上月" tabId="lastMonth">
                  <ItemSummary startDate="2026-11-01" endDate="2026-12-31" />
                </ItemTab>
                <ItemTab tabName="今年" tabId="thisYear">
                  <ItemSummary startDate="2026-11-01" endDate="2026-12-31" />
                </ItemTab>
                <ItemTab tabName="自定义范围" tabId="customRange">
                  <ItemSummary startDate="2026-11-01" endDate="2026-12-31" />
                </ItemTab>
              </SwitchTabs>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
