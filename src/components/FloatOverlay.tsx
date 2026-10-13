import { defineComponent } from 'vue'

/**
 * @Description: 划出浮层
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 23:42:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 00:02:46
 * @FilePath: src/components/FloatOverlay.tsx
 */
export const FloatOverlay = defineComponent({
  name: 'FloatOverlay',
  setup(/* _props, _ctx */) {
    return () => <div>
      <section>
        <h2>未登录用户</h2>
        <p>点击这里登录</p>
      </section>

      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
    </div>
  },
})
