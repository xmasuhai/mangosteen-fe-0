import { defineComponent, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from 'cn'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import type { SvgIconName } from '@svgoStore'

/**
 * @Description: 菜单跳转项
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 14:35:51
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-14 14:45:23
 * @FilePath: src/modules/overlay/MenuLinkItem.tsx
 */
export const MenuLinkItem = defineComponent({
  name: 'MenuLinkItem',
  props: {
    linkPath: {
      type: String as PropType<string>,
      required: false,
      default: '/',
    },
    linkTitle: {
      type: String as PropType<string>,
      required: false,
      default: '标题占位',
    },
    iconName: {
      type: String as PropType<SvgIconName>,
      required: false,
      default: 'pig',
    },
  },
  setup(_props, _ctx) {
    return () => (
      <li>
        <RouterLink
          to={_props.linkPath}
          class={cn('flex justify-start items-center', 'p-y-12px p-x-1em')}>
          <SvgIcon name={_props.iconName} class="mr-12px" />
          <span>{_props.linkTitle}</span>
        </RouterLink>
      </li>
    )
  },
})
