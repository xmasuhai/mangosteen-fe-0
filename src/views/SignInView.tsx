import { defineComponent } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { FormContainer } from '@/components/form/FormContainer.tsx'
import { FormItem } from '@/components/form/FormItem.tsx'

/**
 * @Description: 登录视图
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 22:17:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 22:23:23
 * @FilePath: src/views/SignInView.tsx
 */
export const SignInView = defineComponent({
  name: 'SignInView',

  setup(/* _props, _ctx */) {
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () =>  <SvgIcon name="back-arrow" size="1.5em" onClick={() => {}} />,
          default: () => (
            <div>
              <FormContainer>
                <FormItem label="邮箱地址" type="text"/>
                <FormItem label="验证码" type="text"/>
                <FormItem type="button" buttonConfig={{ text: '登录' }}/>
              </FormContainer>
            </div>
          )
        }}
      </MainLayout>
    )
  },
})
