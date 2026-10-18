import { defineComponent } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { TagForm } from '@/modules/tags/TagForm.tsx'

/**
 * @Description: 创建标签页
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:53:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 22:15:56
 * @FilePath: src/views/TagCreateView.tsx
 */
export const TagCreateView = defineComponent({
  name: 'TagCreateView',
  setup(/* _props, _ctx */) {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <SvgIcon name="back-arrow" size="1.5em" onClick={() => {}} />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    )
  },
})
