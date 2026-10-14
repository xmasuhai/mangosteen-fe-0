import { defineComponent, type PropType } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { cn } from 'cn'

/**
 * @Description: 划出浮层
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 23:42:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 13:01:58
 * @FilePath: src/components/FloatOverlay.tsx
 */
export const FloatOverlay = defineComponent({
  name: 'FloatOverlay',
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    }
  },
  setup( _props, _ctx ) {
    const onClose = () => {
      _props.onClose?.()
    }
    return () => (
      <>
        <section
          onClick={onClose}
          class={cn(
          'fixed z-[var(--z-index-float-overlay)] bg-[var(--overlay-mask-bg)]',
          'top-[var(--top-safe-area-height)] left-0',
          'w-full h-[calc(100%-var(--top-safe-area-height))]'
        )}>
          遮罩
        </section>

        <aside class={cn(
          'fixed z-[calc(var(--z-index-float-overlay)+1)] bg-[var(--overlay-bg)]',
          'top-[var(--top-safe-area-height)] left-0',
          'w-18em h-[calc(100%-var(--top-safe-area-height))]',
        )}>
          <section>
            <h2>未登录用户</h2>
            <p>点击这里登录</p>
          </section>

          <nav>
            <menu>
              <li>
                <SvgIcon name="chart"/>
                <span>统计图表</span>
              </li>
              <li>
                <SvgIcon name="export"/>
                <span>导出数据</span>
              </li>
              <li>
                <SvgIcon name="notify"/>
                <span>记账提醒</span>
              </li>
              <li>
                <SvgIcon name="tech_stack"/>
                <span>本App技术栈</span>
              </li>
            </menu>
          </nav>

        </aside>
      </>
    )
  },
})
