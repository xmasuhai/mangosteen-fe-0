import { defineComponent, type PropType, } from 'vue'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { cn } from 'cn'
import { genDefaultSlotTabs } from '@/views/genDefaultSlotTabs.ts'

/**
 * @Description: 切换标签Tab列表组件
 * @Description: 内部必须使用默认插槽接收 ItemTab 组件，ItemTab 组件必须有 tabName 属性
 * @Description: 拿到默认插槽的子组件数组，遍历判断是否为 ItemTab 或是 'v-fgt'，递归拍平返回子组件数组并渲染 defaultSlotTabs
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 17:39:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-20 17:53:40
 * @FilePath: src/components/tab/SwitchTabs.tsx
 */
export const SwitchTabs = defineComponent({
  name: 'SwitchTabs',
  props: {
    selected: {
      type: String as PropType<string>,
    },
  },
  setup(_props, _ctx) {
    const selectedClass = (tabName: string) =>
      _props.selected === tabName
        ? cn(
            'relative',
            `after:(content-[""] block absolute bottom-0 left-0 w-full h-4px bg-[var(--tabs-indicator-bg)])`,
          )
        : ''

    return () => {
      const defaultSlotTabs = genDefaultSlotTabs(_ctx.slots?.default?.() ?? [])
      const ifAllItemTab = defaultSlotTabs
        .every((slot) => slot.type === ItemTab && !!slot.props?.tabName)
      if (!ifAllItemTab) {
        throw new Error(`SwitchTabs: 子组件必须是 ItemTab，且必须有 tabName 属性`)
      }

      return (
        <div class="grow-1 shrink-1 overflow-auto scrollbar-hide relative">
          {/* 切换标签 */}
          <nav class="sticky left-0 top-0 z-1 bg-[var(--navbar-bg-end)]">
            <menu class="flex justify-start items-center text-color-[var(--navbar-text-color)]">
              {defaultSlotTabs.map((slot, index) => (
                <li
                  key={index + slot?.props?.tabName}
                  class={cn(
                    'where:(text-center grow-1 shrink-0 px-1em py-12px)',
                    selectedClass(slot?.props?.tabName),
                  )}
                  onClick={() => {
                    _ctx.emit('update:selected', slot?.props?.tabName)
                  }}>
                  {slot?.props?.tabName}
                </li>
              ))}
            </menu>
          </nav>

          {/* 标签内容-插槽-数组 */}
          <section class="max-h-[calc(100vh-136px)] overflow-auto scrollbar-hide">
            {defaultSlotTabs.find((slot) => slot.props?.tabName === _props.selected)}
          </section>
        </div>
      )
    }
  },
})
