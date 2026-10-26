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
 * @LastEditTime: 2026-10-21 20:06:05
 * @FilePath: src/modules/tags/EmojiSelector.tsx
 */
export const EmojiSelector = defineComponent({
  name: 'EmojiSelector',
  props: {
    modelValue: { type: String, default: '' },
    hasError: { type: Boolean, default: false },
    // extraHint: { type: String, default: '' },
  },
  emits: ['update:extraHint', 'update:modelValue'],
  setup(_props, _ctx) {
    const selectedMainTopic = ref<EmojiMainTopic>('表情')
    const selectedEmoji = ref('')
    const selectedEmojiHint = ref('')
    watch([selectedEmoji, selectedEmojiHint], () => {
      _ctx.emit('update:modelValue', selectedEmoji.value)
      _ctx.emit('update:extraHint', `${selectedEmoji.value} ${selectedEmojiHint.value}`)
    })
    const clearEmoji = () => {
      selectedEmoji.value = ''
      selectedEmojiHint.value = ''
      _ctx.emit('update:modelValue', '')
      _ctx.emit('update:extraHint', '')
    }
    watch(selectedMainTopic, () => {
      clearEmoji()
    })
    return () => (
      <div
        class={cn(
          'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
          'b-1 rounded-[var(--input-radius)] text-14px',
          _props.hasError ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
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
