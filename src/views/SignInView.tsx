import { defineComponent, reactive } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { FormContainer } from '@/components/form/FormContainer.tsx'
import { FormItem } from '@/components/form/FormItem.tsx'
import { cn } from 'cn'
import { formValidate } from '@/shared/validator/formValidate.ts'

/**
 * @Description: 登录视图
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 22:17:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 22:29:21
 * @FilePath: src/views/SignInView.tsx
 */
export const SignInView = defineComponent({
  name: 'SignInView',
  setup(/* _props, _ctx */) {
    const formData = reactive({ email: '', validationCode: '' })
    const genOriginErrors = () => ({ email: [], validationCode: [] })
    const errors = reactive(genOriginErrors())
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault()
      Object.assign(errors, genOriginErrors(),)
      const newErrors = formValidate(formData, [
        { key: 'email', type: 'required', required: true, message: '必填' },
        // /.+@.+/
        { key: 'email', type: 'pattern', regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: '邮箱格式错误' },
        { key: 'validationCode', type: 'required', required: true, message: '必填' },
      ])
      Object.assign(errors, newErrors)
    }
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () =>  <SvgIcon name="back-arrow" size="1.5em" onClick={() => {}} />,
          default: () => (
            <div>
              <div class="flex flex-col justify-center items-center pt-42px">
                <SvgIcon name="mangosteen" class="w-64px h-68px"/>
                <h1 class="text-[var(--app-name-text)] text-2em font-bold">山竹记账</h1>
              </div>
              <FormContainer onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  hasErrorPlaceholder
                  placeholder="请输入邮箱，然后点击发送验证码"
                  error={errors.email?.join('，')} />
                <FormItem
                  label="验证码"
                  type="validationCode"
                  v-model={formData.validationCode}
                  hasErrorPlaceholder
                  placeholder="请输入六位数字"
                  error={errors.validationCode?.join('，')} />
                <FormItem
                  type="submit"
                  buttonConfig={{ text: '登录' }}
                  class={cn('mt-2em')} />
              </FormContainer>
            </div>
          )
        }}
      </MainLayout>
    )
  },
})
