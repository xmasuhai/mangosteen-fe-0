import { defineComponent, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 20:32:00
 * @FilePath: src/views/ItemList.tsx
 */
export const ItemList = defineComponent({
  name: 'ItemList',
  setup(/* _props, _ctx */) {
    const kind = ref('支出')
    const onUpdateSeleted = (name: string) => {kind.value = name}
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <SvgIcon name="back-arrow" class="w-2em h-2em" />,
          default: () => (
            <>
              <SwitchTabs selected={kind.value} onUpdateSeleted={onUpdateSeleted}>
                <ItemTab tabId="expenses" tabName="支出">icon 列表</ItemTab>
                <ItemTab tabId="incomes" tabName="收入">icon 列表</ItemTab>
              </SwitchTabs>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
