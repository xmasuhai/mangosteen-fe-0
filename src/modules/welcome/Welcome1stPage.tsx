import { defineComponent } from 'vue'
import pig from '@/assets/icons/pig.svg'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from '@/modules/welcome/WelcomeLayout.tsx'

/**
 * @Description: 欢迎页：存钱罐
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-09-24 12:11:33
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-09-27 17:50:47
 * @FilePath: src/modules/welcome/Welcome1stPage.tsx
 */
export const Welcome1stPage = defineComponent({
  name: 'Welcome1stPage',
  setup(/*props, ctx*/) {
    return () => (
      <WelcomeLayout
        v-slots={{
          icon: () => <img src={pig} alt="pig" class="w-128px h-130px mt-25%" />,
          title: () => (
            <>
              <h2>会挣钱</h2>
              <h2>还要会省钱</h2>
            </>
          ),
          buttons: () => <RouterLink to="/welcome/2">下一页</RouterLink>,
        }}
      />
    )
  },
})
