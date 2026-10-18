import { defineComponent, ref } from 'vue'
import { cn } from 'cn'
import { type EmojiMainTopic, emojiTopicList, type EmojiTopics } from '@/const/emojiTopicList.ts'
import { type EmojiItem, safeEmojiList } from '@/const/safeEmojiList.ts'

/**
 * @Description: 颜文字选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 22:14:34
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 13:01:50
 * @FilePath: src/modules/tags/EmojiSelector.tsx
 */
export const EmojiSelector = defineComponent({
  name: 'EmojiSelector',
  setup(/* _props, _ctx */) {
    const navList: EmojiMainTopic[] = emojiTopicList
      .map(topicItem => topicItem.mainTopic)
    const selectedTopic = ref<EmojiMainTopic>(navList[0] ?? '表情')
    const selectedTopicList = emojiTopicList
      .find(topicItem => topicItem.mainTopic === selectedTopic.value)
      ?.topics as  EmojiTopics
    const selectedEmojiList: EmojiItem[] = safeEmojiList
      .filter(item => selectedTopicList.includes(item.topic))
      .map(item => item.emoji_list)
      .flat()
      .map(item => item?.unicode)

    return () => (
      <div
        class={cn(
          'formItem emojiList error',
          'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
          'b-1 rounded-[var(--input-radius)] text-14px',
          // 动态切换边框颜色 hasError
          Math.random() > 0.5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]',
        )}>
        <nav
          class={cn(
            'flex flex-nowrap overflow-auto mx-1em py-0 scrollbar-hide',
            '[&>span]:(shrink-0 inline-block p-.5em text-[var(--emoji-nav-text)] whitespace-nowrap)',
            '[&>span.selected]:text-[var(--emoji-nav-text-selected)]',
          )}>
          {navList.map((item) => (
            <span class={item === selectedTopic.value ? 'selected' : ''}>
              {item}
            </span>
          ))}
        </nav>

        <ul
          class={cn(
            'scrollbar-hide overflow-auto max-h-[calc(1.5em_*_12)]',
            'flex flex-wrap content-start px-.5em py-0 text-22px line-height-1.5em',
            'children:(grow-0 shrink-0 w-10%) text-center',
          )}>
          {selectedEmojiList.map(unicode => (<li>{unicode}</li>)) }
        </ul>
      </div>
    )
  },
})
