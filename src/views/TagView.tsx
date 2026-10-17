import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

/**
 * @Description: 标签视图
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:27:10
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 15:30:45
 * @FilePath: src/views/TagView.tsx
 */
export const TagView = defineComponent({
  name: 'TagView',
  setup(/* _props, _ctx */) {
    return () => <RouterView />
  },
})
