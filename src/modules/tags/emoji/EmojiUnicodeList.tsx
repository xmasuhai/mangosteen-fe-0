import { computed, type ComputedRef, defineComponent, type PropType, ref, watch } from 'vue'
import { cn } from 'cn'
import { type EmojiItem, safeEmojiList } from '@/const/safeEmojiList.ts'
import { type EmojiMainTopic, type EmojiSubTopic, emojiTopicList } from '@/const/emojiTopicList.ts'

/**
 * @Description: 颜文字编码列表
 * @Description: 入参 selectedMainTopic: 选中的主题；
 * @Description: 监听入参主题变化，清空本地selectedEmojiUnicode，发布emoji、emojiHint更新事件；
 * @Description: 切换选择颜文字编码，更新本地selectedEmojiUnicode，发布emoji、emojiHint更新事件；
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 19:54:04
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 21:36:07
 * @FilePath: src/modules/tags/emoji/EmojiUnicodeList.tsx
 */
export const EmojiUnicodeList = defineComponent({
  name: 'EmojiUnicodeList',
  props: {
    selectedMainTopic: {
      type: String as PropType<EmojiMainTopic>,
      default: '表情',
    },
  },
  emits: ['update:emoji', 'update:emojiHint'],
  setup(_props, _ctx) {
    const selectedTopicList: ComputedRef<readonly EmojiSubTopic[]> = computed(
      () =>
        emojiTopicList.find((topicItem) => topicItem.mainTopic === _props.selectedMainTopic)
          ?.topics ?? [],
    )
    const selectedFlattedEmojiList: ComputedRef<EmojiItem[]> = computed(() =>
      safeEmojiList
        .filter((item) => selectedTopicList.value.includes(item.topic))
        .flatMap((item) => item.emoji_list),
    )
    const selectedMainTopicEmojiUnicodeList: ComputedRef<string[]> = computed(() =>
      selectedFlattedEmojiList.value.map((item) => item.unicode),
    )
    const selectedEmojiUnicode = ref('')
    const selectedEmojiHint: ComputedRef<string> = computed(
      () => selectedFlattedEmojiList.value
        ?.find((emojiItem) =>
            emojiItem.unicode === selectedEmojiUnicode.value,)
        ?.hint ?? '',
    )
    const switchEmojiUnicode = (unicode: string) => {
      selectedEmojiUnicode.value = unicode
      _ctx.emit('update:emoji', unicode)
      _ctx.emit('update:emojiHint', selectedEmojiHint.value)
    }
    watch(() => _props.selectedMainTopic, () => {
        selectedEmojiUnicode.value = ''
        _ctx.emit('update:emoji', '')
        _ctx.emit('update:emojiHint', '')
      },)

    return () => (
      <ul
        class={cn(
          'scrollbar-hide overflow-auto h-[calc(1.65em_*_12)]',
          'flex flex-wrap content-start px-.5em py-2.5px',
          'text-22px line-height-1.5em',
        )}>
        {selectedMainTopicEmojiUnicodeList.value.map((unicode) => (
          <li
            onClick={() => switchEmojiUnicode(unicode)}
            class={cn(
              'text-center grow-0 shrink-0 w-10% b-1 b-transparent',
              unicode === selectedEmojiUnicode.value &&
                'bg-blue-300 outline-1px outline-solid outline-[var(--button-main)] rounded-[var(--input-radius)]',
            )}>
            {unicode}
          </li>
        ))}
      </ul>
    )
  },
})
