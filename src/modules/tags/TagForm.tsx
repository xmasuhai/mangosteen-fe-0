import { defineComponent, reactive } from 'vue'
import { BarButton } from '@/components/BarButton.tsx'
import { cn } from 'cn'
import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'

/**
 * @Description: 标签表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:55:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 17:02:43
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  setup(/* _props, _ctx */) {
    const formData = reactive({
      name: '',
      sign: '',
    })

    return () => (
      <form class="p-1em min-h-720px h-full">
        <div class="mt-0.5em flex-grow-0">
          <label for="tag-name">
            <span class="">标签名称</span>

            <div class="flex mt-0.25em">
              <input
                id="tag-name"
                v-model={formData.name}
                class={cn(
                  'flex-grow-1 min-h-[var(--input-min-height)] max-w-100%',
                  'b-1 rounded-[var(--input-radius)]',
                  'text-18px p-x-1em shadow-[inset_0_0_3px_var(--input-shadow)]',
                  // 动态切换边框颜色 hasError
                  Math.random() > 0.5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]',
                )}
              />
            </div>

            <div class="m-t-.25em text-12px color-[var(--error-color)]">
              <span>必填</span>
            </div>
          </label>
        </div>

        <div class="mt-0.5em">
          <label class="flex flex-col">
            <span class="">符号 {formData.sign}</span>

            <div class={cn('flex mt-0.25em')}>
              <EmojiSelector v-model:emoji={formData.sign} />
            </div>

            <div class="m-t-.25em text-12px color-[var(--error-color)]">
              <span>必填</span>
            </div>
          </label>
        </div>

        <p class="tips flex-grow-0 text-center py-1em px-0 min-h-[var(--input-min-height)]">
          记账时长按即可进行编辑
        </p>

        <div class="formRow flex-grow-0 mt-0.5em min-h-[var(--input-min-height)]">
          <div class="formValue mt-0.25em">
            <BarButton class="formItem button formItem_value">确定</BarButton>
          </div>
        </div>
      </form>
    )
  },
})
