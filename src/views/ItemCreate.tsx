import { defineComponent, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { InputPad } from '@/modules/items/InputPad.tsx'

/**
 * @Description: 记一笔
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:00:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 16:19:06
 * @FilePath: src/views/ItemCreate.tsx
 */
export const ItemCreate = defineComponent({
  name: 'ItemCreate',
  setup(/* _props, _ctx */) {
    const kindRef = ref('支出')
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 4, name: '打车', sign: '￥', category: 'expenses' },
      { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 6, name: '打车', sign: '￥', category: 'expenses' },
      { id: 7, name: '聚餐', sign: '￥', category: 'expenses' },
    ])
    const refIncomeTags = ref([
      { id: 4, name: '工资', sign: '￥', category: 'incomes' },
      { id: 5, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 6, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 11, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 18, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 17, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 19, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 4, name: '工资', sign: '￥', category: 'incomes' },
      { id: 5, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 6, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 11, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 18, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 17, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 19, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 4, name: '工资', sign: '￥', category: 'incomes' },
      { id: 5, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 6, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 11, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 18, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 17, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 19, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 4, name: '工资', sign: '￥', category: 'incomes' },
      { id: 5, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 6, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 11, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 18, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 17, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 19, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 4, name: '工资', sign: '￥', category: 'incomes' },
      { id: 5, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 6, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 11, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 18, name: '滴滴', sign: '￥', category: 'incomes' },
      { id: 17, name: '彩票', sign: '￥', category: 'incomes' },
      { id: 19, name: '滴滴', sign: '￥', category: 'incomes' },
    ])

    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <SvgIcon name="back-arrow" class="w-2em h-2em" />,
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                selected={kindRef.value}
                v-model:selected={kindRef.value}>
                <ItemTab tabId="expenses" tabName="支出" class="flex flex-wrap pt-1em">
                  <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
                    <div class="bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)] w-12vw h-12vw rounded-[50%] flex justify-center items-center">
                      <SvgIcon name="add" class="fill-[var(--main)]" />
                    </div>
                    <div class="text-12px mt-.25em">
                      新增
                    </div>
                  </div>
                  {refExpensesTags.value.map(tag =>
                    <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
                      <div class="bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)] w-12vw h-12vw rounded-[50%] flex justify-center items-center">
                        {tag.sign}
                      </div>
                      <div class="text-12px mt-.25em">
                        {tag.name}
                      </div>
                    </div>
                  )}
                </ItemTab>
                <ItemTab tabId="incomes" tabName="收入" class="flex flex-wrap pt-1em">
                  <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
                    <div class="bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)] w-12vw h-12vw rounded-[50%] flex justify-center items-center">
                      <SvgIcon name="add" class="fill-[var(--main)]" />
                    </div>
                    <div class="text-12px mt-.25em">
                      新增
                    </div>
                  </div>
                  {refIncomeTags.value.map(tag =>
                    <div class="relative w-20vw h-[calc(20vw*1.14)] flex flex-col items-center">
                      <div class="bg-[var(--tag-bg)] b-1 b-solid b-[var(--tag-bg)] w-12vw h-12vw rounded-[50%] flex justify-center items-center">
                        {tag.sign}
                      </div>
                      <div class="text-12px mt-.25em">
                        {tag.name}
                      </div>
                    </div>
                  )}
                </ItemTab>
              </SwitchTabs>

              <section class="w-full grow-0 shrink-0">
                <InputPad />
              </section>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
