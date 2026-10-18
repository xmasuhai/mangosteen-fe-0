import { defineComponent, reactive, ref, toRaw } from 'vue'
import { BarButton } from '@/components/BarButton.tsx'
import { cn } from 'cn'
import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'
import {
  type ErrorsType,
  type FormDataType,
  formValidate,
  type Rules,
} from '@/shared/validator/formValidate.ts'

/**
 * @Description: 标签表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:55:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 00:03:54
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  setup(/* _props, _ctx */) {
    const emojiHint = ref('')
    const formData = reactive<FormDataType>({
      name: '',
      sign: '',
    })
    const errors = ref<ErrorsType<FormDataType>>({})
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault()
      const rules: Rules<FormDataType> = [
        { key: 'name', type: 'required', required: true, message: '必填', },
        { key: 'name', type: 'pattern', regexp: /^.{1,4}$/, message: '只能填1到4个字符', },
        { key: 'sign', type: 'required', required: true, message: '必填', },
      ]
      errors.value = formValidate(toRaw(formData), rules)
    }
    return () => (
      <form
        onSubmit={onSubmit}
        class="p-1em min-h-720px h-full">
        <div class="mt-0.5em flex-grow-0">
          <label for="tag-name">
            <span>标签名称</span>

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
              <span>{errors.value.name?.join(', ')}</span>
            </div>
          </label>
        </div>

        <div class="mt-0.5em">
          <label class="flex flex-col">
            <span>符号 {formData.sign} {emojiHint.value}</span>

            <div class="flex mt-0.25em">
              <EmojiSelector
                v-model:emoji={formData.sign}
                v-model:emojiHint={emojiHint.value}/>
            </div>

            <div class="m-t-.25em text-12px color-[var(--error-color)]">
              <span>{errors.value.sign?.join(', ')}</span>
            </div>
          </label>
        </div>

        <p class="tips flex-grow-0 text-center py-1em px-0 min-h-[var(--input-min-height)]">
          记账时长按即可进行编辑
        </p>

        <div class="flex-grow-0 mt-0.5em min-h-[var(--input-min-height)]">
          <div class="mt-0.25em">
            <BarButton
              type="submit"
              onClick={() => {}}
              class="formItem button formItem_value">确定</BarButton>
          </div>
        </div>
      </form>
    )
  },
})
