import { defineComponent, ref } from 'vue'
import { cn } from 'cn'
import { BarButton } from '@/components/BarButton.tsx'
import { FloatButton } from '@/components/FloatButton.tsx'
import { PlaceCenter } from '@/components/PlaceCenter.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { NavBar } from '@/components/NavBar.tsx'
import '@/views/StartAccountsView.scoped.scss'
import { FloatOverlay } from '@/modules/overlay/FloatOverlay.tsx'

/**
 * @Description: 开始记账页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:51:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 14:34:36
 * @FilePath: src/views/StartAccountsView.tsx
 */
export const StartAccountsView = defineComponent({
  name: 'StartAccountsView',
  setup(/*props, ctx*/) {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }

    return () => (
      <div class={cn('start-accounts-view w-full h-full position-relative')}>
        <NavBar
          direct-scoped
          class="navbar bg-gradient-to-b from-[var(--navbar-bg-start)] to-[var(--navbar-bg-end)]">
          {{
            default: () => '山竹记账',
            icon: () => <SvgIcon name="menu" class="w-2em h-2em" onClick={onClickMenu} />,
          }}
        </NavBar>

        <PlaceCenter class="p-y-10em">
          <SvgIcon class="w-8em h-8em" name="pig" />
        </PlaceCenter>

        <div class={cn('p-x-1em')}>
          <BarButton>开始记账</BarButton>
        </div>

        <FloatButton iconName="add" class="fixed bottom-1em right-1em" />

        {
          overlayVisible.value &&
          <FloatOverlay
            direct-scoped
            onClose={() => (overlayVisible.value = false)} />
        }
      </div>
    )
  },
})
