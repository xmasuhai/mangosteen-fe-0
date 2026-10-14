import { defineComponent } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description: 记账项目列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:07:32
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 17:36:50
 * @FilePath: src/views/ItemList.tsx
 */
export const ItemList = defineComponent({
  name: 'ItemList',
  setup(/* _props, _ctx */) {
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <SvgIcon name="back-arrow" class="w-2em h-2em" />,
          default: () => <div>main</div>,
        }}
      </MainLayout>
    )
  },
})
