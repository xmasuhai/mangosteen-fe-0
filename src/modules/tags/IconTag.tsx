import { defineComponent, /* type PropType */
  type PropType} from 'vue'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 16:53:10
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 17:04:09
 * @FilePath: src/modules/tags/IconTag.tsx
 */
export const IconTag = defineComponent({
  name: 'IconTag',
  props: {
    tagName: { type: String as PropType<string>, default: '', },
    tagSign: { type: String as PropType<string>, default: '😃', },
  },
  setup( _props, _ctx ) {
    return () => (
      <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
        <div class="bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)] w-12vw h-12vw rounded-[50%] flex justify-center items-center">
          {
            _ctx.slots?.default?.()
            ? _ctx.slots?.default?.()
            : _props.tagSign
          }
        </div>
        <div class="text-12px mt-.25em">
          {_props.tagName}
        </div>
      </div>
    )
  },
})
