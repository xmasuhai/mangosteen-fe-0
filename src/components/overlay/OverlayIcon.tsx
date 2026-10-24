import { defineComponent, type PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { FloatOverlay } from '@/components/overlay/FloatOverlay.tsx'
import { useOverlayStore } from '@/stores/useOverlayStore.ts'
import type { SvgIconNames } from '@svgoStore'

/**
 * @Description: 图标菜单浮层组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 21:38:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 16:54:53
 * @FilePath: src/components/overlay/OverlayIcon.tsx
 */
export const OverlayIcon = defineComponent({
  name: 'OverlayIcon',
  props:{
    iconName: { type: String as PropType<SvgIconNames>, default: 'menu', },
  },
  setup( _props, _ctx ) {
    const { overlayVisible } = storeToRefs(useOverlayStore())
    const { toggleOverlay } = useOverlayStore()
    const onClickMenu = () => {
      toggleOverlay()
    }
    return () => (
      <>
        <SvgIcon name={_props.iconName} class="w-2em h-2em" onClick={onClickMenu} />
        {overlayVisible.value && <FloatOverlay />}
      </>
    )
  },
})
