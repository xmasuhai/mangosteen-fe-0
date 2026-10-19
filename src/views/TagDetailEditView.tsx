import { defineComponent, } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { TagForm } from '@/modules/tags/TagForm.tsx'

/**
 * @Description: 标签详情编辑页
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:54:11
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 21:03:16
 * @FilePath: src/views/TagDetailEditView.tsx
 */
export const TagDetailEditView = defineComponent({
  name: 'TagDetailEditView',
  setup(/* _props, _ctx */) {
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <SvgIcon name="back-arrow" size="1.5em" onClick={() => {}} />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    )
  },
})
