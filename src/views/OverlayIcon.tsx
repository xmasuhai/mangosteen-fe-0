import { defineComponent /*,  type PropType */ } from 'vue'
import { storeToRefs } from 'pinia'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { FloatOverlay } from '@/components/overlay/FloatOverlay.tsx'
import { useOverlayStore } from '@/stores/useOverlayStore.ts'

/**
 * @Description: 图标菜单浮层组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 21:38:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 21:40:18
 * @FilePath: src/views/OverlayIcon.tsx
 */
export const OverlayIcon = defineComponent({
  name: 'OverlayIcon',
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
    const { overlayVisible } = storeToRefs(useOverlayStore())
    const { toggleOverlay } = useOverlayStore()
    const onClickMenu = () => {
      toggleOverlay()
    }
    return () => (
      <>
        <SvgIcon name="menu" class="w-2em h-2em" onClick={onClickMenu} />
        {overlayVisible.value && <FloatOverlay />}
      </>
    )
  },
})
