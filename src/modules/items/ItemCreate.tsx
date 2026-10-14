import { defineComponent, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'

/**
 * @Description: 记一笔
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:00:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 22:34:34
 * @FilePath: src/modules/items/ItemCreate.tsx
 */
export const ItemCreate = defineComponent({
  name: 'ItemCreate',
  setup(/* _props, _ctx */) {
    const kind = ref('支出')
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <SvgIcon name="back-arrow" class="w-2em h-2em" />,
          default: () => (
            <>
              <SwitchTabs selected={kind.value} v-model:selected={kind.value}>
                <ItemTab tabId="expenses" tabName="支出">支出 icon 列表</ItemTab>
                <ItemTab tabId="incomes" tabName="收入">收入 icon 列表</ItemTab>
              </SwitchTabs>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
