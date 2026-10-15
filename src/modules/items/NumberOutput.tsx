import { defineComponent /* type PropType */ } from 'vue'

/**
 * @Description:
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:59:39
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 22:59:46
 * @FilePath: src/modules/items/NumberOutput.tsx
 */
export const NumberOutput = defineComponent({
  name: 'NumberOutput',
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
    return () => <>NumberOutput</>
  },
})
