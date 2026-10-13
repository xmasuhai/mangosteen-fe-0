import { defineComponent } from 'vue'
import { BarButton } from '@/components/BarButton.tsx'
import { cn } from 'cn'

/**
 * @Description: 开始记账页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:51:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 14:14:25
 * @FilePath: src/views/StartAccountsView.tsx
 */
export const StartAccountsView = defineComponent({
  name: 'StartAccountsView',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const onClick = (e: MouseEvent) => {
      console.log('_______________________')
      console.log("%c 4 --> e: ","color:#f00;", e);
      console.log('_______________________')
    }

    return () => (
      <div class="start-accounts-view">
        <div
          class={cn('p-x-1em')}>
          <BarButton onClick={onClick}>
            测试
          </BarButton>
        </div>
      </div>
    )
  },
})
