import { defineComponent /* type PropType */ } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 颜文字选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 22:14:34
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 00:38:22
 * @FilePath: src/modules/tags/EmojiSelector.tsx
 */
export const EmojiSelector = defineComponent({
  name: 'EmojiSelector',
  props: {
    /*
    propsName: {
      type: String as PropType<string>,
      required: false,
      validator: (/!* value *!/) => true,
    }
    }
    }
  */
  },
  setup(/* _props, _ctx */) {
    console.log('EmojiSelector_______________________')
    // console.log('emojiJson', emojiJson)
    console.log('_______________________EmojiSelector')
    const navList = [
      '表情',
      '手势',
      '职业',
      '衣服',
      '动物',
      '植物',
      '自然',
      '食物',
      '运动',
    ]

    return () => (
      <div class={cn(
        'formItem emojiList error',
        'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
        'b-1 rounded-[var(--input-radius)] text-14px',
        // 动态切换边框颜色 hasError
        Math.random() > .5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]'
      )}>
        <nav class={cn(
          'flex flex-nowrap overflow-auto mx-1em py-0 scrollbar-hide',
          '[&>span]:(shrink-0 inline-block p-.5em text-[var(--emoji-nav-text)] whitespace-nowrap)',
          '[&>span.selected]:text-[var(--emoji-nav-text-selected)]',
        )}>
          <span class="selected">选中</span>
          {navList.map(item => <span>{item}</span>)}
        </nav>

        <ul class={cn(
          'scrollbar-hide overflow-auto max-h-[calc(1.5em_*_12)]',
          'flex flex-wrap content-start px-.5em py-0 text-22px line-height-1.5em',
          'children:(grow-0 shrink-0 w-10%) text-center',
        )}>
          <li>🐶</li>
        </ul>

      </div>
    )
  },
})
