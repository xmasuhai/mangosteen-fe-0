import { defineComponent } from 'vue'
import { cn } from 'cn'
import { BarButton } from '@/components/BarButton.tsx'
import { FloatButton } from '@/components/FloatButton.tsx'
import { PlaceCenter } from '@/components/PlaceCenter.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { NavBar } from '@/components/NavBar.tsx'
import '@/views/StartAccountsView.scoped.scss'

/**
 * @Description: 开始记账页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:51:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-13 23:22:37
 * @FilePath: src/views/StartAccountsView.tsx
 */
export const StartAccountsView = defineComponent({
  name: 'StartAccountsView',
  setup(/*props, ctx*/) {
    const onClick = (e: MouseEvent) => {
      console.log('_______________________')
      console.log("%c 4 --> e: ","color:#f00;", e);
      console.log('_______________________')
    }

    return () => (
      <div class={cn(
        'start-accounts-view w-full h-full position-relative',
      )}>
        <NavBar direct-scoped class="navbar bg-gradient-to-b from-[var(--navbar-bg-start)] to-[var(--navbar-bg-end)]">{
          {
            default: '山竹记账',
            icon: (cls: string) => <SvgIcon name="menu" class={cls} data-xxx="标记" />,
          }
        }</NavBar>

        <PlaceCenter class="p-y-10em">
          <SvgIcon class="w-8em h-8em" name="pig"/>
        </PlaceCenter>

        <div
          class={cn('p-x-1em')}>
          <BarButton onClick={onClick}>
            测试
          </BarButton>
        </div>

        <FloatButton
          iconName="add"
          class="fixed bottom-1em right-1em" />
      </div>
    )
  },
})
