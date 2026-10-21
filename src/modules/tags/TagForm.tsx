import { defineComponent, reactive, /* ref, */ toRaw } from 'vue'
import { BarButton } from '@/components/BarButton.tsx'
// import { cn } from 'cn'
// import { EmojiSelector } from '@/modules/tags/EmojiSelector.tsx'
import {
  type FormDataType,
  type FormRules,
  formValidate,
} from '@/shared/validator/formValidate.ts'
import { FormContainer } from '@/components/form/FormContainer.tsx'
import { FormItem } from '@/components/form/FormItem.tsx'

/**
 * @Description: 标签表单组件
 * @Description: 仅做验证逻辑，展示验证错误结果；
 * @Description: 仅当编辑tag时，有表单默认数据，通过 props 传入；
 * @Description: 提交逻辑抛出事件；
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:55:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 21:53:18
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  setup(/* _props, _ctx */) {
    // const emojiHint = ref('')

    const formData = reactive<FormDataType>({
      name: '',
      sign: '',
    })
    const errors = reactive<{[k in keyof FormDataType]?: string[]}>({})
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault()
      const rules = [
        { key: 'name', type: 'required', required: true, message: '必填', },
        { key: 'name', type: 'pattern', regexp: /^.{1,4}$/, message: '只能填1到4个字符', },
        { key: 'sign', type: 'required', required: true, message: '必填', },
      ] satisfies FormRules<typeof formData>
      // 每次先清空上一次报错
      Object.assign(errors, {name: undefined, sign: undefined,} )
      // reactive 无法重复赋值，只能覆盖key
      Object.assign(errors, formValidate(toRaw(formData), rules))
    }
    return () => (
      /*
      <form
        onSubmit={onSubmit}
        class="p-1em min-h-720px">
        <div class="mt-0.5em flex-grow-0">
          <label for="tag-name">
            <span>标签名称</span>

            <div class="flex mt-0.25em">
              <input
                id="tag-name"
                v-model={formData.name}
                class={cn(
                  'grow-1 min-h-[var(--input-min-height)] max-w-100%',
                  'b-1 rounded-[var(--input-radius)]',
                  'text-18px p-x-1em shadow-[inset_0_0_3px_var(--input-shadow)]',
                  errors.name ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
                )}
              />
            </div>

            <div class="min-h-18px m-t-.25em text-12px color-[var(--error-color)]">
              <span>{errors.name?.join(', ')}</span>
            </div>
          </label>
        </div>

        <div class="mt-0.5em">
          <label class="flex flex-col">
            <span>符号 {emojiHint.value}</span>

            <div class="flex mt-0.25em">
              <EmojiSelector
                hasError={!!errors.sign?.join(', ')}
                v-model={formData.sign}
                v-model:extraHint={emojiHint.value}/>
            </div>

            <div class="min-h-18px m-t-.25em text-12px color-[var(--error-color)]">
              <span>{errors.sign?.join(', ')}</span>
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
      */

      <FormContainer
        onSubmit={onSubmit}>
        <FormItem type="text" label="标签名称" v-model={formData.name} hasErrorPlaceholder error={errors.name?.join(', ')}/>
        <FormItem type="emojiSelector" label="符号" v-model={formData.sign} hasErrorPlaceholder error={errors.sign?.join(', ') }/>
        <FormItem>
          <p class="tips text-center py-1em px-0 min-h-[var(--input-min-height)]">
            记账时长按即可进行编辑
          </p>
        </FormItem>
        <FormItem>
          <BarButton
            type="submit"
            onClick={() => {}}
            class="formItem button formItem_value">确定</BarButton>
        </FormItem>
      </FormContainer>
    )
  },
})
