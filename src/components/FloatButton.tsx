import { defineComponent } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'

interface FloatButtonProps {
  onClick?: (e: MouseEvent) => void,
}

/**
 * @Description: 浮动按钮：位置固定、内容仅支持图标
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 14:23:09
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 15:27:10
 * @FilePath: src/components/FloatButton.tsx
 */
export const FloatButton = defineComponent<FloatButtonProps>({
  name: 'FloatButton',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    return () => (
      <div>
        <SvgIcon name="add"/>
      </div>
    )
  },
})
