import { defineComponent } from 'vue'
import { cn } from 'cn'
import { useRouter } from 'vue-router'
import { BarButton } from '@/components/BarButton.tsx'
import { FloatButton } from '@/components/FloatButton.tsx'
import { PlaceCenter } from '@/components/PlaceCenter.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { OverlayIcon } from '@/views/OverlayIcon.tsx'

/**
 * @Description: 开始记账页面
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 11:51:17
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 21:41:49
 * @FilePath: src/views/StartAccountsView.tsx
 */
export const StartAccountsView = defineComponent({
  name: 'StartAccountsView',
  setup(/*props, ctx*/) {
    const router = useRouter()
    const routerToCreateItemView = async () => {
      await router.push('/items/create')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <OverlayIcon/>,
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
                class="fixed bottom-1em right-1em"
              />
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
