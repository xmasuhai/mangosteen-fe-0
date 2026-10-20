import { defineComponent, type PropType } from 'vue'

interface ItemTabProps {
  tabId: string
  tabName: string
}

/**
 * @Description: 切换标签Tab组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 19:14:35
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-20 17:34:49
 * @FilePath: src/components/tab/ItemTab.tsx
 */
export const ItemTab = defineComponent<ItemTabProps>({
  name: 'ItemTab',
  props: {
    tabId: {
      type: String as PropType<string>,
      required: true,
    },
    tabName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(_props, _ctx) {
    return () => <div class="item-tab">{_ctx.slots?.default?.()}</div>
  },
})
