import { defineComponent } from 'vue'
import { cn } from 'cn'
import { BarButton } from '@/components/BarButton.tsx'
import { FloatButton } from '@/components/FloatButton.tsx'
import { PlaceCenter } from '@/components/PlaceCenter.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { FloatOverlay } from '@/modules/overlay/FloatOverlay.tsx'
import { storeToRefs } from 'pinia'
import { useOverlayStore } from '@/stores/useOverlayStore.ts'
import { useRouter } from 'vue-router'
import { MainLayout } from '@/components/layout/MainLayout.tsx'

/**
 * @Description: 开始记账页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:51:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 23:04:11
 * @FilePath: src/views/StartAccountsView.tsx
 */
export const StartAccountsView = defineComponent({
  name: 'StartAccountsView',
  setup(/*props, ctx*/) {
    const { overlayVisible } = storeToRefs(useOverlayStore())
    const { toggleOverlay } = useOverlayStore()
    const onClickMenu = () => {
      toggleOverlay()
    }
    const router = useRouter()
    const routerToCreateItemView = async () => {
      await router.push('/item/create')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <SvgIcon name="menu" class="w-2em h-2em" onClick={onClickMenu} />,
          default: () => (
            <>
              <PlaceCenter class="p-y-10em">
                <SvgIcon class="w-8em h-8em" name="pig" />
              </PlaceCenter>

              <div class={cn('p-x-1em')}>
                <BarButton onClick={routerToCreateItemView}>开始记账</BarButton>
              </div>

              <FloatButton
                onClick={routerToCreateItemView}
                iconName="add"
                class="fixed bottom-1em right-1em"/>

              {overlayVisible.value && <FloatOverlay direct-scoped />}
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
