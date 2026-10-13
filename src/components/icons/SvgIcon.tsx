import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'
import {
  svgIconNames,
  type SvgIconNames,
  type SvgIconName,
  SvgIconEnum,
} from '@svgoStore'

/**
 * @Description: 图标文件名称作为 id，导出名称列表，并动态生成枚举类型
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 15:00:40
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 17:01:41
 * @FilePath: src/components/icons/SvgIcon.tsx
 */
export { svgIconNames, type SvgIconNames, type SvgIconName, SvgIconEnum }

interface SvgIconProps {
  name: SvgIconNames
}

/**
 * @Description: 图标组件
 * @Description: 默认使用插件 vite-plugin-svg-icons-ng
 * @Description: 替换使用插件 svgoStore
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-10 16:17:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 17:01:41
 * @FilePath: src/components/icons/SvgIcon.tsx
 */
export const SvgIcon = defineComponent<SvgIconProps>({
  name: 'SvgIcon',
  props: {
    name: {
      type: String as PropType<SvgIconNames>,
      required: true,
      validator: (value: unknown) =>
        typeof value === 'string' && (svgIconNames as readonly string[]).includes(value),
    },
  },
  setup(props, _ctx) {
    // 添加验证
    if (!props.name || !(svgIconNames as readonly string[]).includes(props.name)) {
      console.error(`Invalid icon name: ${props.name}`)
    }

    return () => (
      <svg
        class={cn(
          'where:(h-1em w-1em align-[-0.15em] fill-[currentColor] overflow-clip)',
        )}
        aria-hidden="true">
        <use xlinkHref={`#icon-${props.name}`}/>
      </svg>
    )
  },
})
