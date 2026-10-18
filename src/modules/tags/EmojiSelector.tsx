import { defineComponent, ref, watch } from 'vue'
import { cn } from 'cn'
import { type EmojiMainTopic } from '@/const/emojiTopicList.ts'
import { EmojiMainTopicNav } from '@/modules/tags/emoji/EmojiMainTopicNav.tsx'
import { EmojiUnicodeList } from '@/modules/tags/emoji/EmojiUnicodeList.tsx'

/**
 * @Description: 颜文字选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 22:14:34
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 21:07:52
 * @FilePath: src/modules/tags/EmojiSelector.tsx
 */
export const EmojiSelector = defineComponent({
  name: 'EmojiSelector',
  props: {
    emoji: { type: String, default: '' },
    emojiHint: { type: String, default: '' },
  },
  emits: ['update:emoji', 'update:emojiHint'],
  setup(_props, _ctx) {
    const selectedMainTopic = ref<EmojiMainTopic>('表情')
    const selectedEmoji = ref('')
    const selectedEmojiHint = ref('')
    watch([selectedEmoji, selectedEmojiHint], () => {
      _ctx.emit('update:emoji', selectedEmoji.value)
      _ctx.emit('update:emojiHint', selectedEmojiHint.value)
    })
    const clearEmoji = () => {
      selectedEmoji.value = ''
      selectedEmojiHint.value = ''
      _ctx.emit('update:emoji', '')
      _ctx.emit('update:emojiHint', '')
    }
    watch(selectedMainTopic, () => {
      clearEmoji()
    })
    return () => (
      <div
        class={cn(
          'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
          'b-1 rounded-[var(--input-radius)] text-14px',
          // 动态切换边框颜色 hasError
          Math.random() > 0.5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]',
        )}>
        <EmojiMainTopicNav v-model:mainTopic={selectedMainTopic.value} />
        <EmojiUnicodeList
          selectedMainTopic={selectedMainTopic.value}
          v-model:emoji={selectedEmoji.value}
          v-model:emojiHint={selectedEmojiHint.value}
        />
      </div>
    )
  },
})
