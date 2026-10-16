import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

type DirectionType = 'horizontal' | 'vertical' | '|' | '-'
interface PlaceCenterProps {
  direction?: DirectionType
}

/**
 * @Description: 居中组件
 * @Description: 可配置 上下居中 | 左右居中
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 17:23:10
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 20:43:58
 * @FilePath: src/components/icons/PlaceCenter.tsx
 */
export const PlaceCenter = defineComponent<PlaceCenterProps>({
  name: 'PlaceCenter',
  props: {
    direction: {
      type: String as PropType<PlaceCenterProps['direction']>,
      required: false,
      default: 'horizontal',
    },
  },
  setup(_props, _ctx) {
    const direction = _props.direction ?? 'horizontal'
    const flexDirection = cn(['horizontal', '-'].includes(direction) ? 'flex-row' : 'flex-col')
    return () => (
      <section class={cn('flex place-items-center place-content-center', flexDirection)}>
        {_ctx.slots?.default?.()}
      </section>
    )
  },
})
