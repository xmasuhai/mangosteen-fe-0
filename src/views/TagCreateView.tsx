import { defineComponent /* type PropType */ } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

/**
 * @Description: 创建标签页
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 15:53:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 15:50:17
 * @FilePath: src/views/TagCreateView.tsx
 */
export const TagCreateView = defineComponent({
  name: 'TagCreateView',
  props: {
    /*
    propsName: {
      type: String as PropType<string>,
      required: false,
      validator: (/!* value *!/) => true,
    }
  */
  },
  setup(/* _props, _ctx */) {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <SvgIcon name="back-arrow" size="1.5em" onClick={() => {}} />,
        default: () => (
          <>内容</>
        ),
      }}</MainLayout>
    )
  },
})
