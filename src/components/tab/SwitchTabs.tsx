import { defineComponent, type PropType } from 'vue'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { cn } from 'cn'
import { genDefaultSlotTabs } from '@/components/tab/genDefaultSlotTabs.ts'

/**
 * @Description: 切换标签Tab列表组件
 * @Description: 内部必须使用默认插槽接收 ItemTab 组件，ItemTab 组件必须有 tabName 属性
 * @Description: 拿到默认插槽的子组件数组，遍历判断是否为 ItemTab 或是 'v-fgt'，递归拍平返回子组件数组并渲染 defaultSlotTabs
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 17:39:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 14:50:58
 * @FilePath: src/components/tab/SwitchTabs.tsx
 */
export const SwitchTabs = defineComponent({
  name: 'SwitchTabs',
  props: {
    selectedTabId: {
      type: String as PropType<string>,
    },
  },
  emits: [
    // 由点击事件触发
    'update:selectedTabId',
  ],
  setup(_props, _ctx) {
    const selectedClass = (tabId: string) =>
      _props.selectedTabId === tabId
        ? cn(
            'relative',
            `after:(content-[""] block absolute bottom-0 left-0 w-full h-4px bg-[var(--tabs-indicator-bg)])`,
          )
        : ''
    const onSwitchTab = (tabId: string) => {
      _ctx.emit('update:selectedTabId', tabId)
    }

    return () => {
      // 支持插槽使用map遍历生成的文档片段
      const defaultSlotTabs = genDefaultSlotTabs(_ctx.slots?.default?.() ?? [])
      const ifAllItemTab = defaultSlotTabs.every(
        (slot) =>
          slot.type === ItemTab &&
          slot.props &&
          Object.hasOwn(slot.props, 'tabId') &&
          Object.hasOwn(slot.props, 'tabName'),
      )
      if (!ifAllItemTab) {
        throw new Error(`SwitchTabs: 子组件必须是 ItemTab 组件，且必须有 tabId 和 tabName 属性`)
      }

      return (
        <div class="grow-1 shrink-1 overflow-auto scrollbar-hide relative">
          {/* 切换标签导航 */}
          <nav class="sticky left-0 top-0 z-1 bg-[var(--navbar-bg-end)]">
            <menu class="flex justify-start items-center text-color-[var(--navbar-text-color)]">
              {defaultSlotTabs.map((slot, index) => (
                <li
                  key={`${index}-${slot?.props?.tabId}`}
                  class={cn(
                    'where:(text-center grow-1 shrink-0 px-1em py-12px)',
                    selectedClass(slot?.props?.tabId),
                  )}
                  onClick={() => onSwitchTab(slot?.props?.tabId)}>
                  {slot?.props?.tabName}
                </li>
              ))}
            </menu>
          </nav>

          {/* 标签内容-插槽-数组 */}
          <section class="max-h-[calc(100vh-136px)] overflow-auto scrollbar-hide">
            {defaultSlotTabs.find((slot) => slot.props?.tabId === _props.selectedTabId)}
          </section>
        </div>
      )
    }
  },
})
