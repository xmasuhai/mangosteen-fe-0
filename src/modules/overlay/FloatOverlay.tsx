import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'
import { MenuLinkItem } from '@/modules/overlay/MenuLinkItem.tsx'
import type { SvgIconName } from '@svgoStore'

type MenuLinkItem = {
  linkPath: string
  linkTitle: string
  iconName: SvgIconName
}

/**
 * @Description: 划出浮层
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-13 23:42:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 14:53:25
 * @FilePath: src/modules/overlay/FloatOverlay.tsx
 */
export const FloatOverlay = defineComponent({
  name: 'FloatOverlay',
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    }
  },
  setup( _props, _ctx ) {
    const menuLinkItemList: Readonly<MenuLinkItem[]> = Object.freeze([
      {linkPath: '/statistics', linkTitle: '统计图表', iconName: 'chart'},
      {linkPath: '/export', linkTitle: '导出数据', iconName: 'export'},
      {linkPath: '/notify', linkTitle: '记账提醒', iconName: 'notify'},
      {linkPath: '/tech_stack', linkTitle: '本App技术栈', iconName: 'tech_stack'}
    ])

    const onClose = () => {
      _props.onClose?.()
    }
    const onClickSignIn = () => { console.log('点击登录') }
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

        <aside
          class={cn(
          'fixed z-[calc(var(--z-index-float-overlay)+1)] bg-[var(--overlay-bg)]',
          'top-[var(--top-safe-area-height)] left-0',
          'w-18em h-[calc(100%-var(--top-safe-area-height))]', )}>
          <section
            onClick={onClickSignIn}
            class={cn(
              'p-y-2em p-x-1em',
              'bg-[var(--overlay-user-bg)] text-[var(--overlay-user-text)]',
            )}>
            <h2>未登录用户</h2>
            <p>点击这里登录</p>
          </section>

          <nav>
            <menu
              class={cn(
                'p-t-1em text-20px'
              )}>
              {menuLinkItemList.map((item) => (
                <MenuLinkItem
                  key={item.linkPath}
                  linkPath={item.linkPath}
                  linkTitle={item.linkTitle}
                  iconName={item.iconName}/>
              ))}
            </menu>
          </nav>
        </aside>
      </>
    )
  },
})
