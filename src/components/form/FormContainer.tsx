import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 表单容器组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-21 17:14:25
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 20:11:14
 * @FilePath: src/components/form/FormContainer.tsx
 */
export const FormContainer = defineComponent({
  name: 'FormContainer',
  props: {
    onSubmit: {
      type: Function as PropType<(e: SubmitEvent) => void>,
    },
  },
  setup(_props, _ctx) {
    return () => (
      <form onSubmit={_props.onSubmit} class={cn('where:(p-1em min-h-720px)')}>
        {_ctx.slots?.default?.()}
      </form>
    )
  },
})
