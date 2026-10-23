import { defineComponent, reactive, toRaw, } from 'vue'
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
 * @LastEditTime: 2026-10-23 22:24:00
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  props: {
    /* 仅当编辑tag时，有表单默认数据，通过 props 传入；暂时占位 */
  },
  setup(/* _props, _ctx */) {
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
      <FormContainer
        onSubmit={onSubmit}>
        <FormItem
          type="text"
          label="标签名称"
          v-model={formData.name}
          hasErrorPlaceholder
          error={errors.name?.join(', ')}/>
        <FormItem
          type="emojiSelector"
          label="符号"
          v-model={formData.sign}
          hasErrorPlaceholder
          error={errors.sign?.join(', ') }/>
        <FormItem>
          <p class="tips text-center py-1em px-0 min-h-[var(--input-min-height)]">
            记账时长按即可进行编辑
          </p>
        </FormItem>
        <FormItem type="submit" buttonConfig={{ level: 'primary', text: '保存' }} />
      </FormContainer>
    )
  },
})
