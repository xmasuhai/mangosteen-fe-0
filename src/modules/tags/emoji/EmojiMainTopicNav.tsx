import { ref, computed, defineComponent, type ComputedRef, type PropType } from 'vue'
import { cn } from 'cn'
import { type EmojiMainTopic, emojiTopicList } from '@/const/emojiTopicList.ts'

/**
 * @Description: 颜文字主题导航
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 19:53:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 20:35:09
 * @FilePath: src/modules/tags/emoji/EmojiMainTopicNav.tsx
 */
export const EmojiMainTopicNav = defineComponent({
  name: 'EmojiMainTopicNav',
  props: {
    mainTopic: { type: String as PropType<EmojiMainTopic>, default: '表情' },
  },
  emits: ['update:mainTopic'],
  setup(_props, _ctx) {
    const navList: ComputedRef<EmojiMainTopic[]> = computed(() =>
      emojiTopicList.map((topicItem) => topicItem.mainTopic),
    )
    const selectedMainTopic = ref<EmojiMainTopic>(navList.value?.[0] ?? _props.mainTopic)
    const selectMainTopic = (topic: EmojiMainTopic) => {
      _ctx.emit('update:mainTopic', topic)
      selectedMainTopic.value = topic
    }
    return () => (
      <nav>
        <menu
          class={cn(
            'flex flex-nowrap overflow-auto mx-1em py-0 scrollbar-hide',
            '[&>li.selected]:(text-[var(--emoji-nav-text-selected)] font-bold)',
          )}>
          {navList.value.map((item) => (
            <li
              onClick={() => selectMainTopic(item)}
              class={cn(
                'shrink-0 inline-block p-.5em text-[var(--emoji-nav-text)] whitespace-nowrap',
                item === selectedMainTopic.value ? 'selected' : '',
              )}>
              {item}
            </li>
          ))}
        </menu>
      </nav>
    )
  },
})
