import { defineComponent } from 'vue'
import { cn } from 'cn'
import type { SvgIconName } from '@svgoStore'
import { MenuLinkItem } from '@/modules/overlay/MenuLinkItem.tsx'

type MenuLinkItemType = {
  linkPath: string
  linkTitle: string
  iconName: SvgIconName
}

/**
 * @Description: 菜单链接列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 14:58:23
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 15:06:16
 * @FilePath: src/modules/overlay/MenuLinkList.tsx
 */
export const MenuLinkList = defineComponent({
  name: 'MenuLinkList',
  setup(/* _props, _ctx */) {
    const menuLinkItemList: Readonly<MenuLinkItemType[]> = Object.freeze([
      {linkPath: '/statistics', linkTitle: '统计图表', iconName: 'chart'},
      {linkPath: '/export', linkTitle: '导出数据', iconName: 'export'},
      {linkPath: '/notify', linkTitle: '记账提醒', iconName: 'notify'},
      {linkPath: '/tech_stack', linkTitle: '本App技术栈', iconName: 'tech_stack'}
    ])

    return () => (
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
    )
  },
})
