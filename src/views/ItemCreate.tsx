import { computed, defineComponent, ref } from 'vue'
import { MainLayout } from '@/components/layout/MainLayout.tsx'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { SwitchTabs } from '@/components/tab/SwitchTabs.tsx'
import { ItemTab } from '@/components/tab/ItemTab.tsx'
import { InputPad } from '@/modules/items/InputPad.tsx'
import { IconTag } from '@/modules/tags/IconTag.tsx'

/**
 * @Description: 记一笔
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 16:00:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 21:34:59
 * @FilePath: src/views/ItemCreate.tsx
 */
export const ItemCreate = defineComponent({
  name: 'ItemCreate',
  setup(/* _props, _ctx */) {
    const kindRef = ref('expenses')
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
    const itemTabList = computed(() => ([
      { tabId: 'expenses', tabName: '支出', tagList: refExpensesTags.value, },
      { tabId: 'incomes', tabName: '收入', tagList: refIncomeTags.value, },
    ]))
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <SvgIcon name="back-arrow" class="w-2em h-2em" />,
          default: () => (
            <div class="h-full flex flex-col">
              <SwitchTabs
                v-model:selectedTabId={kindRef.value}>
                {
                  itemTabList.value
                    .map(itemTab => (
                      <ItemTab
                        key={itemTab.tabId}
                        tabId={itemTab.tabId}
                        tabName={itemTab.tabName}
                        class="flex flex-wrap pt-1em">
                        <IconTag tagName="新增">
                          <SvgIcon name="add" class="fill-[var(--main)]" />
                        </IconTag>
                        {
                          itemTab.tagList
                            .map(tag =>
                              <IconTag tagName={tag.name} tagSign={tag.sign}/>
                            )
                        }
                      </ItemTab>
                    ))
                }
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
