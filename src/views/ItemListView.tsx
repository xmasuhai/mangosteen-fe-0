import { defineComponent } from 'vue'
import { ItemSummary } from '@/modules/items/ItemSummary.tsx'
import { DateTabsLayout } from '@/components/layout/DateTabsLayout.tsx'
import { OverlayIcon } from '@/components/overlay/OverlayIcon.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 17:00:49
 * @FilePath: src/views/ItemListView.tsx
 */
export const ItemListView = defineComponent({
  name: 'ItemListView',
  setup(/* _props, _ctx */) {
    return () => (
      <DateTabsLayout title="山竹记账">
        {{
          icon: () => <OverlayIcon iconName="menu" />,
          default: ({ start, end }: { start: string; end: string }) => (
            <ItemSummary startDate={start} endDate={end} />
          ),
        }}
      </DateTabsLayout>
    )
  },
})
