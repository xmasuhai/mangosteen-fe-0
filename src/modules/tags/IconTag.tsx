import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 记账图标标签组件
 * @Description: 兼容插槽，可放图标组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 16:53:10
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 21:10:56
 * @FilePath: src/modules/tags/IconTag.tsx
 */
export const IconTag = defineComponent({
  name: 'IconTag',
  props: {
    tagName: { type: String as PropType<string>, default: '' },
    // emoji 符号表情或者默认插槽二选一
    tagSign: { type: String as PropType<string>, default: '😃' },
  },
  setup(_props, _ctx) {
    return () => (
      <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
        <div
          class={cn(
            'size-12vw max-w-50px max-h-50px rounded-[50%] ',
            'bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)]',
            'flex justify-center items-center',
          )}>
          {_ctx.slots?.default?.() ? _ctx.slots?.default?.() : _props.tagSign}
        </div>
        <div class="text-12px mt-.25em">{_props.tagName}</div>
      </div>
    )
  },
})
