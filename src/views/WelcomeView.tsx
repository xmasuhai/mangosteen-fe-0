import {defineComponent,} from 'vue'
import {RouterView} from 'vue-router'

/**
 * @Description: 欢迎页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-22 21:26:21
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-24 13:17:41
 * @FilePath: src/views/WelcomeView.tsx
 */
export const WelcomeView = defineComponent({
  name: 'WelcomeView',
  props: {},
  components: {},
  setup(/*props, ctx*/) {

    return () => (
      <div>
        欢迎页面
        <RouterView/>
      </div>
    )
  },
})
